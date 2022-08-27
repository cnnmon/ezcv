/* eslint-disable no-multi-assign */
/* eslint-disable new-cap */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-use-before-define */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
const _ = require('underscore');
const logger = require('tracer').colorConsole();
const fs = require('fs');
const resume = require('../Resume');
const dictionary = require('../../dictionary');

const profilesWatcher = {
  // for change value by reference
  inProgress: 0,
};

module.exports = {
  parse,
};

function makeRegExpFromDictionary() {
  const regularRules = {
    titles: {},
    profiles: [],
    inline: {},
  };

  _.forEach(dictionary.titles, (titles, key) => {
    regularRules.titles[key] = [];
    _.forEach(titles, (title) => {
      regularRules.titles[key].push(title.toUpperCase());
      regularRules.titles[key].push(
        title[0].toUpperCase() + title.substr(1, title.length)
      );
    });
  });

  _.forEach(dictionary.profiles, (profile) => {
    let profileHandler;

    if (_.isArray(profile)) {
      if (_.isFunction(profile[1])) {
        profileHandler = profile[1];
      }
      profile = profile[0];
    }

    const profileExpr = `((?:https?://)?(?:www\\.)?${profile.replace(
      '.',
      '\\.'
    )}[/\\w \\.-]*)`;
    if (_.isFunction(profileHandler)) {
      regularRules.profiles.push([profileExpr, profileHandler]);
    } else {
      regularRules.profiles.push(profileExpr);
    }
  });

  _.forEach(dictionary.inline, (expr, name) => {
    regularRules.inline[name] = `${expr}:?[\\s]*(.*)`;
  });

  return _.extend(dictionary, regularRules);
}

// dictionary is object, so it will be extended by reference
makeRegExpFromDictionary();

function parse(PreparedFile, cbReturnResume) {
  if (PreparedFile && !PreparedFile.raw) {
    cbReturnResume({ parts: {} }, { error: 'Failed to parse' });
    return {};
  }

  const rawFileData = PreparedFile.raw;

  const Resume = new resume();
  Resume.intialize();
  logger.trace(Resume.jsoned());
  const rows = rawFileData.split('\n');
  let row;

  // save prepared file text (for debug)
  // fs.writeFileSync('./parsed/'+PreparedFile.name + '.txt', rawFileData);

  // 1 parse regulars
  parseDictionaryRegular(rawFileData, Resume);

  for (let i = 0; i < rows.length; i += 1) {
    row = rows[i];

    // 2 parse profiles
    row = rows[i] = parseDictionaryProfiles(row, Resume);

    // 3 parse titles
    parseDictionaryTitles(Resume, rows, i);
    parseDictionaryInline(Resume, row);
  }

  if (_.isFunction(cbReturnResume)) {
    // wait until download and handle internet profile
    let i = 0;
    const checkTimer = setInterval(() => {
      i += 1;
      /**
       * FIXME:profilesWatcher.inProgress not going down to 0 for txt files
       */
      if (profilesWatcher.inProgress === 0 || i > 5) {
        // if (profilesWatcher.inProgress === 0) {
        cbReturnResume(Resume.jsoned());
        clearInterval(checkTimer);
      }
    }, 200);
  } else {
    return console.error('cbReturnResume should be a function');
  }
}

/**
 * Make text from @rowNum index of @allRows to the end of @allRows
 * @param rowNum
 * @param allRows
 * @returns {string}
 */
function restoreTextByRows(rowNum, allRows) {
  rowNum -= 1;
  const rows = [];

  do {
    rows.push(allRows[rowNum]);
    rowNum += 1;
  } while (rowNum < allRows.length);

  return rows.join('\n');
}

/**
 * Count words in string
 * @param str
 * @returns {Number}
 */
function countWords(str) {
  return str.split(' ').length;
}

/**
 *
 * @param Resume
 * @param row
 */
function parseDictionaryInline(Resume, row) {
  let find;

  _.forEach(dictionary.inline, (expression, key) => {
    find = new RegExp(expression).exec(row);
    if (find) {
      Resume.addKey(key.toLowerCase(), find[1]);
    }
  });
}

/**
 *
 * @param data
 * @param Resume
 */
function parseDictionaryRegular(data, Resume) {
  const regularDictionary = dictionary.regular;
  let find;

  _.forEach(regularDictionary, (expressions, key) => {
    _.forEach(expressions, (expression) => {
      find = new RegExp(expression).exec(data);

      if (find) {
        Resume.addKey(key.toLowerCase(), find[0]);
      }
    });
  });
}

/**
 *
 * @param Resume
 * @param rows
 * @param rowIdx
 */
function parseDictionaryTitles(Resume, rows, rowIdx) {
  let allTitles = _.flatten(_.toArray(dictionary.titles)).join('|');
  let searchExpression = '';
  const row = rows[rowIdx];
  let ruleExpression;
  let isRuleFound;
  let result;

  _.forEach(dictionary.titles, (expressions, key) => {
    expressions = expressions || [];
    // means, that titled row is less than 5 words
    if (countWords(row) <= 5) {
      _.forEach(expressions, (expression) => {
        ruleExpression = new RegExp(expression);
        isRuleFound = ruleExpression.test(row);

        if (isRuleFound) {
          allTitles = _.without(allTitles.split('|'), key).join('|');
          searchExpression = `(?:${expression})((.*\n)+?)(?:${allTitles}|{end})`;
          // restore remaining text to search in relevant part of text
          result = new RegExp(searchExpression, 'gm').exec(
            restoreTextByRows(rowIdx, rows)
          );

          if (result) {
            Resume.addKey(key, result[1]);
          }
        }
      });
    }
  });
}

/**
 *
 * @param row
 * @param Resume
 * @returns {*}
 */
function parseDictionaryProfiles(row, Resume) {
  const regularDictionary = dictionary.profiles;
  let find;
  let modifiedRow = row;

  _.forEach(regularDictionary, (expression) => {
    let expressionHandler;

    if (_.isArray(expression)) {
      if (_.isFunction(expression[1])) {
        expressionHandler = expression[1];
      }
      expression = expression[0];
    }
    find = new RegExp(expression).exec(row);
    if (find) {
      Resume.addKey('profiles', `${find[0]}\n`);
      modifiedRow = row.replace(find[0], '');
      if (_.isFunction(expressionHandler)) {
        profilesWatcher.inProgress += 1;
        expressionHandler(find[0], Resume, profilesWatcher);
      }
    }
  });

  return modifiedRow;
}
