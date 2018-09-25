import {ApolloServer} from 'apollo-server-micro'
import micro from 'micro'
import * as next from 'next'
import {createConfig} from './app/graphql'
import {createHandler} from './app/handler'

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
  await app.prepare()

  // Start up server
  const server = micro(createHandler(app, apollo.createHandler()))

  // Uncomment to add subscription support
  // apollo.installSubscriptionHandlers(server)

  server.listen(port, () => console.log(`Server started on port ${port}`))
}
