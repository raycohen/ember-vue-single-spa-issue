'use strict';

const path = require('path');
const fs = require('fs');
const RSVP = require('rsvp');
const extractConfigFromHtmlAsJson = require('ember-cli-deploy-json-config/lib/utilities/extract-index-config');

const denodeify = RSVP.denodeify;
const readFile = denodeify(fs.readFile);
const writeFile = denodeify(fs.writeFile);

module.exports = {
  name: require('./package').name,

  isDevelopingAddon() {
    return true;
  },

  // this is read from within extractConfigFromHtmlAsJson
  readConfig(key) {
    if (key === 'jsonBlueprint') {
      return {
        base: {
          selector: 'base',
          attributes: ['href']
        },
        meta: {
          selector: 'meta',
          attributes: ['name', 'content']
        },
        link: {
          selector: 'link',
          attributes: ['rel', 'href', 'integrity']
        },
        script: {
          selector: 'script',
          attributes: ['src', 'integrity'],
          includeContent: false
        }
      };
    }

    return null;
  },

  postBuild(result) {
    const inputPath = path.join(result.directory, 'index.html');
    const outputPath = path.join(result.directory, 'ember.json');

    return readFile(inputPath)
      .then(extractConfigFromHtmlAsJson.bind(this))
      .then(writeFile.bind(writeFile, outputPath))
      .catch(() => {});
  }
};
