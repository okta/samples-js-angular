// Read environment variables from "testenv" file in root of the repository
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '..', 'testenv')
});

const webpack = require('webpack');
const env = {};

// List of environment variables made available to the app
[
  'ISSUER',
  'CLIENT_ID',
].forEach(function (key) {
  if (!process.env[key]) {
    throw new Error(`Environment variable ${key} must be set. See README.md`);
  }
  env[key] = JSON.stringify(process.env[key]);
});

// Added to angular's webpack config by @angular-builders/custom-webpack
module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    })
  ]
};
