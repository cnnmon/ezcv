/* eslint-disable no-shadow */
/* eslint-disable no-multi-assign */
/* eslint-disable new-cap */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-use-before-define */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
const logger = require('tracer').colorConsole();
const ParseBoy = require('./ParseBoy');
const processing = require('./libs/processing');

const parser = {
  parseToJSON(path, type, cbAfterParse) {
    const objParseBoy = new ParseBoy();
    if (type === 'url') {
      processing.runUrl(path, (preppedFile, error) =>
        objParseBoy.parseUrl(preppedFile, (parsedResume) =>
          cbAfterParse(parsedResume, error)
        )
      );
    } else {
      processing.runFile(path, (preppedFile, error) => {
        objParseBoy.parseFile(preppedFile, (parsedResume) => {
          logger.trace(parsedResume);
          return cbAfterParse(parsedResume, error);
        });
      });
    }
  },
  parseToFile(path, type, savePath, cbAfterParse) {
    const objParseBoy = new ParseBoy();
    const storeFile = (preppedFile, Resume, savePath, cbAfterParse) => {
      objParseBoy.storeResume(preppedFile, Resume, savePath, (err) => {
        if (err) {
          logger.error(`Resume ${preppedFile.name} errored`, err);
          return cbAfterParse(null, `Resume ${preppedFile.name} errored`);
        }
        logger.trace(`Resume ${preppedFile.name} saved`);
        return cbAfterParse(preppedFile.name);
      });
    };

    if (type === 'url') {
      processing.runUrl(path, (preppedFile, error) => {
        if (preppedFile) {
          objParseBoy.parseUrl(preppedFile, (resume) =>
            storeFile(
              new processing.PreparedFile(path.split('/').pop(), preppedFile),
              resume,
              savePath,
              cbAfterParse
            )
          );
        }
      });
    } else {
      processing.runFile(path, (preppedFile, error) => {
        if (preppedFile) {
          objParseBoy.parseFile(preppedFile, (resume) =>
            storeFile(preppedFile, resume, savePath, cbAfterParse)
          );
        }
      });
    }
  },
};

module.exports = parser;
