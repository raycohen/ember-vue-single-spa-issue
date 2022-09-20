import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'four-oh/config/environment';
import singleSpaEmber from 'single-spa-ember';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);

// This is the single-spa part
const emberLifecycles = singleSpaEmber({
  App, // required
  appName: 'four-oh', // required
  createOpts: {
    // optional
    rootElement: '#four-oh',
  },
});

// Single-spa lifecycles.
export const bootstrap = emberLifecycles.bootstrap;
export const mount = emberLifecycles.mount;
export const unmount = emberLifecycles.unmount;
