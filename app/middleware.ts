import {OK} from 'http-status'
import {Middleware} from 'koa'
import * as Router from 'koa-router'
import {Server} from 'next'
import {writeContext} from '../common/middleware'

/**
 * Create middleware to prepare Next-related items
 * @param next Next server instance
 * @return Koa middleware
 */
export function createNextWrapperHandler(next: Server): Middleware {
  return async(ctx, nxt) => {
    try {
      ctx.res.statusCode = OK
      writeContext(ctx)
      await nxt()
    }
    catch(error) {
      await next.renderError(error, ctx.req, ctx.res, ctx.url, ctx.query)
      ctx.respond = false
    }
  }
}

/**
 * Create router middleware
 * @param next Next server instance
 * @return Koa middleware
 */
export function createRouter(next: Server): Middleware {
  const router = new Router()
  const nextHandler = next.getRequestHandler()

  // Add routes
  router.get('*', async ctx => {
    await nextHandler(ctx.req, ctx.res)
    ctx.respond = false
  })

  return router.routes()
}

/**
 * Create handler that accepts parameters from URL or query
 * @param next Next app instance
 * @param url Next based URL (uses the same URL otherwise)
 * @return Handler
 */
export function paramHandler(next: Server, url?: string): Router.IMiddleware {
  return async ctx => {
    const nextUrl = url !== undefined ? url : ctx.url.split('?')[0]
    await next.render(ctx.req, ctx.res, nextUrl, {
      ...ctx.query,
      ...ctx.params,
    })
    ctx.respond = false
  }
}
