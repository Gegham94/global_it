const webpack = require('webpack');
const pkg = require('./package.json');

module.exports = (config) => {
  config.output.filename = 'main.js'
  return config;
};
