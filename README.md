# dbf-polyglot

## What is this?

This is the experiment ground for Dashbaord Foundation team to explore how multiple-framework can work using Micro-frontend architecture.\
Current implementation is based on the [core example](https://single-spa.js.org/docs/examples/#core-team-examples) on `single-spa.js.org`

## How does it work?

Currently we have 4 applcations running at the same time, including 1 root-config & 3 applcaitons using different Frontend framework.\
You can run them seperately or run in all at once.

### At once

```sh
yarn install
yarn start
```

### One app at a time

```sh
cd app/<application>
yarn install
yarn start
```
