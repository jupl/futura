import {Server} from 'hapi'
import Next from 'next'
import * as nextPlugin from '~/common/plugins/next'

// Gather configuration data
const production = process.env.NODE_ENV === 'production'
let port = parseInt(process.env.PORT !== undefined ? process.env.PORT : '', 10)
if(isNaN(port)) {
  port = 3000
}

(async() => { // tslint:disable-line:no-floating-promises
  // Set up next.js instance
  const next = Next({dev: !production})
  await next.prepare()

  // Start up server
  const server = new Server({port, routes: {security: production}})
  await server.register({...nextPlugin, options: next})
  await server.start()
  console.log('Server running at:', server.info.uri)
})()
