const { mergeWithCustomize, unique } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "polyglot-mf";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  const merge = mergeWithCustomize({
    customizeArray: unique(
      "plugins",
      ["HtmlWebpackPlugin"],
      (plugin) => plugin.constructor && plugin.constructor.name
    ),
  });

  return merge(
    {
      plugins: [
        new HtmlWebpackPlugin({
          inject: false,
          template: "src/index.ejs",
          templateParameters: {
            isLocal: webpackConfigEnv && webpackConfigEnv.isLocal === "true",
            orgName,
          },
        }),
      ],
    },
    defaultConfig,
    {
      // modify the webpack config however you'd like to by adding to this object
      devServer: {
        onBeforeSetupMiddleware: function (devServer) {
          if (!devServer) {
            throw new Error('devServer undefined');
          }
          devServer.app.get('/', (req, res) => {
            res.redirect('/clients/');
          });

          devServer.app.use(['/proxy-to-4400'], createProxyMiddleware({
            target: 'http://localhost:4400',
            pathRewrite: function (path) {
              return path.replace('/proxy-to-4400', '');
            }
          }));
        },
      }
    }
  );
};
