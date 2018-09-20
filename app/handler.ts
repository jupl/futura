import {ApolloServer} from 'apollo-server-micro'
import {RequestHandler} from 'micro'
import {AugmentedRequestHandler, get, options, post, router} from 'microrouter'
import {Server} from 'next'
import * as GraphQL from './graphql'

const GRAPHQL_URL = '/graphql'

/**
 * Create request Next based request handler
 * @param app Next server instance
 * @return Request/response handler
 */
export function createHandler(app: Server): RequestHandler {
  // Set up route handlers
  const graphqlHandler = new ApolloServer(({
    context: GraphQL.createContext(),
    rootValue: GraphQL.createRootValue(),
    schema: GraphQL.createSchema(),
  })).createHandler()
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
