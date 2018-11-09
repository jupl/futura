// tslint:disable:no-object-mutation
// tslint:disable-next-line:no-implicit-dependencies
const {DefinePlugin} = require('webpack')
const path = require('path')

module.exports = {
  analyzeBrowser: process.env.ANALYZE !== 'server',
  analyzeServer: process.env.ANALYZE !== 'client',
  bundleAnalyzerConfig: {
    browser: {
      analyzerMode: 'static',
      reportFilename: '../.bundles/client.html',
    },
    server: {
      analyzerMode: 'static',
      reportFilename: '../../.bundles/server.html',
    },
  },
  poweredByHeader: false,
  /**
   * Additional tweaks to Webpack config
   * @param {object} config Webpack configuration
   * @param {object} options Next options
   * @return {object} Modified Webpack configuration
   */
  webpack(config, {isServer}) {
    config.plugins.push(new DefinePlugin({
      'process.env.IS_SERVER': JSON.stringify(`${isServer}`),
    }))
    config.output.devtoolModuleFilenameTemplate = fixPath
    return config
  },
}

const withCSS = tryRequire('@zeit/next-css')
if(withCSS) {
  module.exports = withCSS(module.exports)
}

const withTypescript = tryRequire('@zeit/next-typescript')
if(withTypescript) {
  module.exports = withTypescript(module.exports)
}

const analyzers = ['server', 'client', 'true']
const withBundleAnalyzer = tryRequire('@zeit/next-bundle-analyzer')
if(withBundleAnalyzer && analyzers.includes(process.env.ANALYZE || '')) {
  module.exports = withBundleAnalyzer(module.exports)
}

/**
 * Node.js' require, but check if it exists first
 * @param {string} module Module name
 * @returns {any} Contents of module
 */
function tryRequire(module) {
  try {
    require.resolve(module)
  }
  catch(e) {
    return undefined
  }
  return require(module)
}

function fixPath({absoluteResourcePath}) {
  const protocol = path.isAbsolute(absoluteResourcePath) ? 'file' : 'webpack'
  const resource = absoluteResourcePath.split(path.sep).join('/')
  return `${protocol}://${resource.startsWith('/') ? '' : '/'}${resource}`
}
