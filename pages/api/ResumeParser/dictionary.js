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
const request = require('request');
const cheerio = require('cheerio');
const _ = require('underscore');

module.exports = {
  titles: {
    header: [
      'contacts',
      'profiles',
      'social connect',
      'social-profiles',
      'social profiles',
      'links',
    ],
    summary: ['summary', 'objective', 'objectives'],
    experience: [
      'experience',
      'experiences',
      'jobs',
      'positions',
      'position',
      'courses',
    ],
    education: ['education'],
    skills: [
      'skills',
      'Skills & Expertise',
      'technology',
      'technologies',
      'languages',
    ],
    projects: ['projects'],
    honors: ['awards', 'honors', 'recognitions'],
    activities: ['activities', 'involvements', 'organizations', 'leadership'],
    /*
    additional: ['additional'],
    certification: ['certification', 'certifications'],
    interests: ['interests'],
    */
  },
  profiles: [
    [
      'github.com',
      function (url, Resume, profilesWatcher) {
        download(url, (data, err) => {
          if (data) {
            const $ = cheerio.load(data);
            const fullName = $('.vcard-fullname').text();
            const location = $('.octicon-location').parent().text();
            const mail = $('.octicon-mail').parent().text();
            const link = $('.octicon-link').parent().text();
            const clock = $('.octicon-clock').parent().text();
            const company = $('.octicon-organization').parent().text();

            Resume.addObject('github', {
              name: fullName,
              location,
              email: mail,
              link,
              joined: clock,
              company,
            });
          } else {
            return console.log(err);
          }
          profilesWatcher.inProgress -= 1;
        });
      },
    ],
    [
      'linkedin.com',
      function (url, Resume, profilesWatcher) {
        download(url, (data, err) => {
          if (data) {
            const $ = cheerio.load(data);
            const linkedData = {
              positions: {
                past: [],
                current: {},
              },
              languages: [],
              skills: [],
              educations: [],
              volunteering: [],
              volunteeringOpportunities: [],
            };
            const $pastPositions = $('.past-position');
            const $currentPosition = $('.current-position');
            const $languages = $('#languages-view .section-item > h4 > span');
            const $skills = $(
              '.skills-section .skill-pill .endorse-item-name-text'
            );
            const $educations = $('.education');
            const $volunteeringListing = $('ul.volunteering-listing > li');
            const $volunteeringOpportunities = $(
              'ul.volunteering-opportunities > li'
            );

            linkedData.summary = $('#summary-item .summary').text();
            linkedData.name = $('.full-name').text();
            // current position
            linkedData.positions.current = {
              title: $currentPosition.find('header > h4').text(),
              company: $currentPosition.find('header > h5').text(),
              description: $currentPosition.find('p.description').text(),
              period: $currentPosition.find('.experience-date-locale').text(),
            };
            // past positions
            _.forEach($pastPositions, (pastPosition) => {
              const $pastPosition = $(pastPosition);
              linkedData.positions.past.push({
                title: $pastPosition.find('header > h4').text(),
                company: $pastPosition.find('header > h5').text(),
                description: $pastPosition.find('p.description').text(),
                period: $pastPosition.find('.experience-date-locale').text(),
              });
            });
            _.forEach($languages, (language) => {
              linkedData.languages.push($(language).text());
            });
            _.forEach($skills, (skill) => {
              linkedData.skills.push($(skill).text());
            });
            _.forEach($educations, (education) => {
              const $education = $(education);
              linkedData.educations.push({
                title: $education.find('header > h4').text(),
                major: $education.find('header > h5').text(),
                date: $education.find('.education-date').text(),
              });
            });
            _.forEach($volunteeringListing, (volunteering) => {
              linkedData.volunteering.push($(volunteering).text());
            });
            _.forEach($volunteeringOpportunities, (volunteering) => {
              linkedData.volunteeringOpportunities.push($(volunteering).text());
            });

            Resume.addObject('linkedin', linkedData);
          } else {
            return console.log(err);
          }
          profilesWatcher.inProgress -= 1;
        });
      },
    ],
    'facebook.com',
    'bitbucket.org',
    'stackoverflow.com',
  ],
  inline: {
    skype: 'skype',
  },
  regular: {
    name: [/([A-Z][a-z]*)(\s[A-Z][a-z]*)/],
    email: [/([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})/],
    phone: [/((?:\+?\d{1,3}[\s-])?\(?\d{2,3}\)?[\s.-]?\d{3}[\s.-]\d{4,5})/],
  },
};

// helper method
function download(url, callback) {
  request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(body);
    } else {
      callback(null, error);
    }
  });
}
