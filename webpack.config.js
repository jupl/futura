// tslint:disable:no-implicit-dependencies no-object-mutation
// tslint:disable:no-require-imports
const {addPlugins, addToEntries, createConfiguration} = require('wcb')
const {BannerPlugin} = require('webpack')

module.exports = addToEntries(addPlugins(createConfiguration({
  destination: 'src/bin',
  environment: 'production',
  log: message => console.log(message),
  source: 'src/bin',
  target: 'node',
}), [
  new BannerPlugin({
    banner: '#!/usr/bin/env node',
    entryOnly: true,
    raw: true,
  }),
]), [
  'reflect-metadata',
])
