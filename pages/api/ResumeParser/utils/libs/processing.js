/* eslint-disable no-shadow */
/* eslint-disable no-multi-assign */
/* eslint-disable new-cap */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-use-before-define */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
const path = require('path');
const _ = require('underscore');
const textract = require('textract');
const mime = require('mime');
const fs = require('fs');
const logger = require('tracer').colorConsole();

module.exports.runFile = processFile;
module.exports.runUrl = processUrl;
module.exports.PreparedFile = PreparedFile;
/**
 *
 * @param file
 * @param cbAfterProcessing
 */
function processFile(file, cbAfterProcessing) {
  extractTextFile(file, (PreparedFile, error) => {
    if (_.isFunction(cbAfterProcessing)) {
      if (error) {
        return cbAfterProcessing(null, error);
      }
      cbAfterProcessing(PreparedFile);
    } else {
      logger.error('cbAfterProcessing should be a function');
      cbAfterProcessing(null, 'cbAfterProcessing should be a function');
    }
  });
}

function processUrl(url, cbAfterProcessing) {
  extractTextUrl(url, (data, error) => {
    if (_.isFunction(cbAfterProcessing)) {
      if (error) {
        return cbAfterProcessing(null, error);
      }
      cbAfterProcessing(data);
    } else {
      logger.error('cbAfterProcessing should be a function');
      cbAfterProcessing(null, 'cbAfterProcessing should be a function');
    }
  });
}

/**
 *
 * @param data
 * @returns {string}
 */
function cleanTextByRows(data) {
  let clearRow;
  const clearRows = [];

  const rows = data.split('\n');
  for (let i = 0; i < rows.length; i += 1) {
    clearRow = cleanStr(rows[i]);
    if (clearRow) {
      clearRows.push(clearRow);
    }
  }

  return `${clearRows.join('\n')}\n{end}`;
}

/**
 *
 * @param file
 * @param cbAfterExtract
 */
function extractTextFile(file, cbAfterExtract) {
  logger.trace(file);
  textract.fromFileWithPath(file, { preserveLineBreaks: true }, (err, data) => {
    if (err) {
      logger.error(err);
      return cbAfterExtract(null, err);
    }
    if (_.isFunction(cbAfterExtract)) {
      data = cleanTextByRows(data);
      const File = new PreparedFile(file, data.replace(/^\s/gm, ''));
      cbAfterExtract(File);
    } else {
      logger.error('cbAfterExtract should be a function');
      return cbAfterExtract(null, 'cbAfterExtract should be a function');
    }
  });
}

function extractTextUrl(url, cbAfterExtract) {
  logger.trace(url);
  textract.fromUrl(url, { preserveLineBreaks: true }, (err, data) => {
    if (err) {
      logger.error(err);
      return cbAfterExtract(null, err);
    }
    if (_.isFunction(cbAfterExtract)) {
      data = cleanTextByRows(data);
      cbAfterExtract(data);
    } else {
      logger.error('cbAfterExtract should be a function');
      return cbAfterExtract(null, 'cbAfterExtract should be a function');
    }
  });
}

/**
 *
 * @param str
 * @returns {string}
 */
function cleanStr(str) {
  return str.replace(/\r?\n|\r|\t|\n/g, '').trim();
}

function PreparedFile(file, raw) {
  this.path = file;
  this.mime = mime.getType(file);
  this.ext = mime.getExtension(this.mime);
  this.raw = raw;
  this.name = path.basename(file);
}

/**
 *
 * @param Resume
 */
PreparedFile.prototype.addResume = (Resume) => {
  this.resume = Resume;
};

PreparedFile.prototype.saveResume = (path, cbSavedResume) => {
  path = path || __dirname;

  if (!_.isFunction(cbSavedResume)) {
    return logger.error('cbSavedResume should be a function');
  }

  if (fs.statSync(path).isDirectory() && this.resume) {
    fs.writeFile(
      `${path}/${this.name}.json`,
      this.resume.jsoned(),
      cbSavedResume
    );
  }
};
