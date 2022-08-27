/* eslint-disable no-shadow */
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
const parser = require('./libs/parser');

/**
 *
 * @constructor
 */
function ParseBoy() {}

/**
 *
 * @param PreparedFile
 * @param cbGetResume
 */
ParseBoy.prototype.parseFile = (PreparedFile, cbGetResume) => {
  logger.trace(`I'm working with "${PreparedFile.name}" now`);
  parser.parse(PreparedFile, cbGetResume);
};

ParseBoy.prototype.parseUrl = (PreparedData, cbGetResume) => {
  logger.trace("I'm working with file buffer now");
  parser.parse(
    {
      raw: PreparedData,
    },
    cbGetResume
  );
};

/**
 *
 * @param PreparedFile
 * @param Resume
 * @param path
 * @param cbOnSaved
 */
ParseBoy.prototype.storeResume = (PreparedFile, Resume, path, cbOnSaved) => {
  PreparedFile.addResume(Resume);

  if (!_.isFunction(cbOnSaved)) {
    return logger.error('cbOnSaved should be a function');
  }
  PreparedFile.saveResume(path, cbOnSaved);
};

/**
 *
 * @type {ParseBoy}
 */
module.exports = ParseBoy;
