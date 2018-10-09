import {ApolloClient} from 'apollo-client'
import {DocumentNode} from 'graphql'
import {Context} from 'koa'
import {IMiddleware} from 'koa-router'
import {get, set} from 'lodash'
import {NextContext} from 'next'

interface Options {
  document: DocumentNode
  createClient(ctx: Context): ApolloClient<{}>
}

/**
 * Create GQL mutation handler as middleware. Request body will contain
 * response data so that it is handled in the next middleware.
 * @param options Options to build middleware
 * @return Koa middleware
 */
export function gqlPost({document, createClient}: Options): IMiddleware {
  return async(ctx, nxt) => {
    const client = createClient(ctx)
    ctx.request.body = await client.mutate({
      mutation: document,
      variables: ctx.request.body,
    })
    await nxt()
  }
}

/**
 * Extract Koa context from Next context
 * @param ctx Next context
 * @return Koa context
 */
export function getContext(ctx: NextContext): Context {
  return get(ctx, 'req._koactx')
}

/**
 * Write Koa context to request
 * @param ctx Koa context
 */
export function writeContext(ctx: Context) {
  set(ctx, 'req._koactx', ctx)
}
