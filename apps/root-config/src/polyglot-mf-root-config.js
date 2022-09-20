import { registerApplication, start } from "single-spa/lib/umd/single-spa.dev";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from 'single-spa-layout';

const routes = constructRoutes(document.querySelector('#single-spa-layout'));
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications, active: false });

applications.forEach((app) => {
  console.log(app);
  if (app.name === "four-oh") {
    registerApplication('four-oh', fourOhLoadingFunction, fourOhActivityFunction);
  } else if (app.name === "@polyglot-mf/clients") {
    registerApplication(app, undefined, function clientsActiveWhen(location) {
      const pathname = location.pathname
      return pathname.startsWith('/clients') || pathname.startsWith('/dashboard/clients');
    });
  } else {
    registerApplication(app);
  }
});

async function fourOhLoadingFunction() {
  const rootUrl = '/proxy-to-4400';
  const emberjsonUrl = `${rootUrl}/ember.json`;

  const emberJsonResponse = await fetch(emberjsonUrl);
  const emberjson = await emberJsonResponse.json();

  emberjson.meta.forEach((meta) => {
    const metaEl = document.createElement('meta');
    metaEl.setAttribute('name', meta.name);
    if (meta.content) {
      metaEl.setAttribute('content', meta.content);
    }
    document.head.appendChild(metaEl);
  });

  const scriptPromises = emberjson.script.map((script) => {
    if (!script.src) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      const scriptEl = document.createElement('script');
      if (script.src.startsWith('http')) {
        scriptEl.src = script.src;
      } else {
        scriptEl.src = rootUrl + script.src;
      }
      scriptEl.async = false;
      scriptEl.onload = resolve;
      scriptEl.onerror = reject;
      document.head.appendChild(scriptEl);
    });
  });

  const linkPromises = emberjson.link.map((link) => {
    return new Promise((resolve, reject) => {
      const linkEl = document.createElement('link');
      if (link.href.startsWith('http')) {
        linkEl.href = link.href;
      } else {
        linkEl.href = rootUrl + link.href;
      }
      linkEl.rel = link.rel;
      linkEl.onload = resolve;
      linkEl.onerror = reject;
      document.head.appendChild(linkEl);
    });
  });

  await Promise.all([...scriptPromises, ...linkPromises]);
  return window.require('four-oh/app');
}

function fourOhActivityFunction(location) {
  // Only render the ember app when the url hash starts with ember
  return location.pathname.startsWith('/four-oh');
}

System.import("@polyglot-mf/styleguide").then(() => {
  // Activate the layout engine once the styleguide CSS is loaded
  layoutEngine.activate();
  start();
});
