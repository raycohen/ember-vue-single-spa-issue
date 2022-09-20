'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    autoRun: false, // Set autoRun to false, because we only want the ember app to render to the DOM when single-spa tells it to.
    storeConfigInMeta: false, // We're making a single-spa application, which doesn't exclusively own the HTML file. So we don't want to have to have a `<meta>` tag for the ember environment to be initialized.
    fingerprint: {
      customHash: null, // This is optional, just will make it easier for you to have the same url every time you do an ember build.
    },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  // Tell ember how to use the single-spa-ember library - pick one of the following
  // if you used npm or yarn
  app.import('node_modules/single-spa-ember/amd/single-spa-ember.js', {
    using: [{ transformation: 'amd', as: 'single-spa-ember' }],
  });

  const { Webpack } = require('@embroider/webpack');
  return require('@embroider/compat').compatBuild(app, Webpack, {
    packagerOptions: {
      webpackConfig: {
        plugins: [],
      },
    },
  });
};
