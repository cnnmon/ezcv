/* eslint-disable no-useless-escape */
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

module.exports = Resume;

function Resume() {
  this.parts = {};
}

Resume.prototype.intialize = () => {
  this.parts = {};
};

Resume.prototype.addKey = (key, value) => {
  let v = value.trim() || '';
  // reject falsy values
  if (v) {
    // Probably not needed
    if (!this.parts) {
      this.parts = {};
    }

    if (_.has(this.parts, key)) {
      v = this.parts[key] + v;
    }

    this.parts[key] = v;
  }
};

Resume.prototype.addObject = (key, options) => {
  const self = this;

  if (!_.has(this.parts, key)) {
    this.parts[key] = {};
  }

  _.forEach(options, (optionVal, optionName) => {
    if (optionVal) {
      self.parts[key][optionName] = optionVal;
    }
  });
};

/**
 *
 * @returns {String}
 */
Resume.prototype.jsoned = () => JSON.stringify(this.parts);
