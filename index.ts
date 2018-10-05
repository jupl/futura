import {ApolloServer} from 'apollo-server-koa'
import * as Koa from 'koa'
import * as createNext from 'next'
import {GRAPHQL_URL, createConfig} from './app/graphql'
import {createErrorHandler, createRouter} from './app/middleware'

const DEFAULT_PORT = 3000

startServer() // tslint:disable-line:no-floating-promises

async function startServer() {
  // Determine port number
  let port = parseInt(process.env.NODE_ENV!, 10)
  port = !isNaN(port) ? port : DEFAULT_PORT

  // Construct instances
  const apollo = new ApolloServer(createConfig())
  const next = createNext({
    dev: process.env.NODE_ENV !== 'production',
    dir: __dirname,
  })

  // Set up server
  const app = new Koa()
  app.use(createErrorHandler(next))
  apollo.applyMiddleware({app, path: GRAPHQL_URL})
  app.use(createRouter(next))
  await next.prepare()

  // Start up server
  app.listen(port, () => {
    console.log(`Server started on port ${port}`)
  })

  // Alternatively to use subscriptions
  // apollo.installSubscriptionHandlers(app.listen(port, () => {
  //   console.log(`Server started on port ${port}`)
  // }))
}
