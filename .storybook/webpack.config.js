module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      {
        loader: 'awesome-typescript-loader',
        options: {
          cacheDirectory: 'node_modules/.awcache',
          configFileName: 'tsconfig.story.json',
          forceIsolatedModules: true,
          transpileOnly: true,
          useCache: true,
        }
      },
    ],
  })
  config.resolve.extensions.push('.ts', '.tsx')
  return config
}
