import {Server} from 'hapi'
import * as Common from '~/common/graphql/resolver'
import * as Apollo from '~/common/plugins/apollo'
import * as Next from '~/common/plugins/next'

// Gather configuration data
const production = process.env.NODE_ENV === 'production'
let port = parseInt(process.env.PORT !== undefined ? process.env.PORT : '', 10)
if(isNaN(port)) {
  port = 3000
}

(async() => { // tslint:disable-line:no-floating-promises
  const server = new Server({port, routes: {security: production}})
  await server.register([
    Apollo.plugin({
      playground: !production,
      resolvers: [Common.Resolver],
      subscriptions: false,
    }),
    Next.plugin({dev: !production}),
  ])
  await server.start()
  console.log('Server running at:', server.info.uri)
})()
