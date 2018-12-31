import {Server} from 'hapi'
import {join, relative} from 'path'
import * as Next from '~/common/plugins/next'

// Gather configuration data
const production = process.env.NODE_ENV === 'production'
let port = Number(process.env.PORT)
if(isNaN(port)) {
  port = 3000
}

(async() => { // tslint:disable-line:no-floating-promises
  const server = new Server({port, routes: {security: production}})
  await server.register([
    Next.createPlugin({
      conf: process.env.WEBPACK_BUILD !== 'true' ? undefined : {
        distDir: relative(process.cwd(), join(__dirname, '../../dist/next')),
      },
      dev: !production,
    }),
  ])
  await server.start()
  server.log([], `Server running at ${server.info.uri}`)
})()
