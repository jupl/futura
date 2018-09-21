const {addPlugins, createConfiguration} = require('wcb')
const {BannerPlugin} = require('webpack')

const configuration = module.exports = addPlugins(createConfiguration({
  atlOptions: {configFileName: 'tsconfig.server.json'},
  environment: 'production',
  log: message => console.log(message),
  pattern: ['index.ts'],
  target: 'node',
}), [
  new BannerPlugin({
    banner: '#!/usr/bin/env node',
    entryOnly: true,
    raw: true,
  }),
])

configuration.output.libraryTarget = 'commonjs'
