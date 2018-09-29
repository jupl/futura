import {ApolloServer} from 'apollo-server-koa'
import * as Koa from 'koa'
import * as next from 'next'
import {createConfig} from './app/graphql'
import {createRouter} from './app/router'

const DEFAULT_PORT = 3000

startServer() // tslint:disable-line:no-floating-promises

async function startServer() {
  // Determine port number
  let port = parseInt(process.env.NODE_ENV!, 10)
  port = !isNaN(port) ? port : DEFAULT_PORT

  // Construct instances
  const apollo = new ApolloServer(createConfig())
  const app = next({
    dev: process.env.NODE_ENV !== 'production',
    dir: __dirname,
  })
  const server = new Koa()
  await app.prepare()

  // Integrate Apollo (uncomment to add subscription support)
  apollo.applyMiddleware({app: server})
  // apollo.installSubscriptionHandlers(server)

  server.use(createRouter(app))

  // Start up server
  server.listen(port, () => console.log(`Server started on port ${port}`))
}
