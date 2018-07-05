require('imports-loader');

const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env);

  // Find Storybook's default CSS processing rule
  const cssLoaderIndex = config.module.rules.findIndex(rule => rule.test.source === '\\.css$');

  if (!Number.isInteger(cssLoaderIndex)) {
    throw new Error('Could not find Storybook\'s CSS loader');
  }

  // ignore gatsby-link's global `__loader` variable
  config.module.rules.push({
    test: require.resolve('gatsby-link'),
    loaders: ['imports-loader?___loader=>{enqueue:function(){}}'],
  });

  return config;
};
