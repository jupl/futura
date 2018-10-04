import {Middleware} from 'koa'
import * as Router from 'koa-router'
import {Server} from 'next'

// tslint:disable:no-object-mutation

/**
 * Create middleware to handle errors
 * @param app Next server instance
 * @return Koa middleware
 */
export function createErrorHandler(app: Server): Middleware {
  return async(ctx, nxt) => {
    try {
      await nxt()
    }
    catch(error) {
      await app.renderError(error, ctx.req, ctx.res, ctx.url, ctx.query)
      ctx.respond = false
    }
  }
}

/**
 * Create router middleware
 * @param app Next server instance
 * @return Koa middleware
 */
export function createRouter(app: Server): Middleware {
  const router = new Router()
  const next = app.getRequestHandler()

  // Add routes
  router.get('*', async ctx => {
    await next(ctx.req, ctx.res)
    ctx.respond = false
  })

  return router.routes()
}

/**
 * Create handler that accepts parameters from URL or query
 * @param app Next app instance
 * @param url Next based URL (uses the same URL otherwise)
 * @return Handler
 */
export function paramHandler(app: Server, url?: string): Router.IMiddleware {
  return async ctx => {
    const nextUrl = url !== undefined ? url : ctx.url.split('?')[0]
    await app.render(ctx.req, ctx.res, nextUrl, {
      ...ctx.query,
      ...ctx.params,
    })
    ctx.respond = false
  }
}
