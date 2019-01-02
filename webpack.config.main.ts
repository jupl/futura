import {addPlugins, addToEntries, createConfiguration} from 'wcb'
// tslint:disable-next-line:no-implicit-dependencies
import {BannerPlugin} from 'webpack'

/** Generated webpack configuration */
export const configuration = addToEntries(addPlugins(createConfiguration({
  destination: '.dist/bin',
  paths: true,
  source: 'src/bin',
  target: 'node',
}), [
  new BannerPlugin({
    banner: '#!/usr/bin/env node',
    entryOnly: true,
    raw: true,
  }),
]), ['dotenv/config'])
