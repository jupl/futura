import {Server, ServerRegisterPluginObject} from 'hapi'
import {ServerOptions as NextOptions} from 'next'
import {resolve} from 'path'
import {resolvers} from '~/app/graphql'
import * as Apollo from '~/common/plugins/apollo'
import * as Log from '~/common/plugins/log'
import * as Next from '~/common/plugins/next'

// Gather configuration data
const production = process.env.NODE_ENV === 'production'
let port = Number(process.env.PORT)
if(isNaN(port)) {
  port = 3000
}

// Fix Next.js options if this is a build
let nextOptions: NextOptions = {}
if(process.env.WEBPACK_BUILD === 'true') {
  nextOptions = {
    ...nextOptions,
    conf: {distDir: 'dist/next'},
    dir: resolve(__dirname, '../..'),
  }
}

(async() => { // tslint:disable-line:no-floating-promises
  const server = new Server({port, routes: {security: production}})
  // tslint:disable-next-line:no-any
  let plugins: ServerRegisterPluginObject<any>[] = [
    Log.createPlugin(),
    Apollo.createPlugin({
      resolvers,
      playground: !production,
      subscriptions: false,
    }),
  ]
  if(process.env.WEBPACK_BUILD === 'true' || process.env.API_ONLY !== 'true') {
    plugins = [
      ...plugins,
      Next.createPlugin({...nextOptions, dev: !production}),
    ]
  }
  else {
    plugins = [
      ...plugins,
      await proxyPlugin(),
    ]
  }
  await server.register(plugins)
  await server.start()
  server.log([], `Server running at ${server.info.uri}`)
})()

async function proxyPlugin() {
  const Proxy = await import('~/common/plugins/proxy')
  return Proxy.createPlugin()
}
