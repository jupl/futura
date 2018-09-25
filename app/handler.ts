import {RequestHandler} from 'micro'
import {AugmentedRequestHandler, get, options, post, router} from 'microrouter'
import {Server} from 'next'
import {GRAPHQL_URL} from './graphql'

/**
 * Create request Next based request handler
 * @param app Next server instance
 * @param graphqlHandler GraphQL handler
 * @return Request/response handler
 */
export function createHandler(
  app: Server,
  graphqlHandler: AugmentedRequestHandler,
): RequestHandler {
  // Set up route handlers
  const nextHandler = app.getRequestHandler()

  // Build handler and wrap any additional handlers
  return router(
    options(GRAPHQL_URL, graphqlHandler),
    post(GRAPHQL_URL, graphqlHandler),
    get(GRAPHQL_URL, graphqlHandler),
    nextHandler,
  )
}

/**
 * Create handler that accepts parameters from URL or query
 * @param app Next app instance
 * @param url Microrouter based URL
 * @return Handler
 */
export function paramHandler(
  app: Server,
  url: string,
): AugmentedRequestHandler {
  return async(req, res) => app.render(req, res, url, {
    ...req.query,
    ...req.params,
  })
}
