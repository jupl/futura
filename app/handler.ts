import {ApolloServer} from 'apollo-server-micro'
import {RequestHandler} from 'micro'
import {AugmentedRequestHandler, get, options, post, router} from 'microrouter'
import {Server} from 'next'
import {GRAPHQL_URL} from './client'
import * as GraphQL from './graphql'

/**
 * Create Apollo server instance
 * @return Apollo server instance
 */
export function createApollo() {
  return new ApolloServer({
    context: GraphQL.createContext(),
    rootValue: GraphQL.createRootValue(),
    schema: GraphQL.createSchema(),
  })
}

/**
 * Create request Next based request handler
 * @param app Next server instance
 * @param apollo Apollo server instance
 * @return Request/response handler
 */
export function createHandler(
  app: Server,
  apollo: ApolloServer,
): RequestHandler {
  // Set up route handlers
  const graphqlHandler = apollo.createHandler()
  const nextHandler = app.getRequestHandler()

  // Build handler and wrap any additional handlers
  let handler = router(
    options(GRAPHQL_URL, graphqlHandler),
    post(GRAPHQL_URL, graphqlHandler),
    get(GRAPHQL_URL, graphqlHandler),
    nextHandler,
  )
  if(process.env.NODE_ENV !== 'production') {
    handler = require('micro-dev/lib/log')(handler, '1mb')
  }
  return handler
}

// @ts-ignore
function paramHandler(app: Server, url: string): AugmentedRequestHandler {
  return async(req, res) => app.render(req, res, url, {
    ...req.query,
    ...req.params,
  })
}
