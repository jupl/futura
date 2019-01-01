import {RequestQuery, ServerRegisterPluginObject as Plugin} from 'hapi'
import Next, {ServerOptions} from 'next'

/**
 * Create Next.js plugin
 * @param opts Next.js server options
 * @return Hapi plugin
 */
export const createPlugin = (opts?: ServerOptions): Plugin<ServerOptions> => ({
  options: opts,
  plugin: {
    name: 'common-next',
    register: async(server, config) => {
      const next = Next(config)
      const handler = next.getRequestHandler()
      await next.prepare()

      // Map routes
      server.route({
        handler: async({url, raw: {req, res}}, {close}) => {
          await handler(req, res, url)
          return close
        },
        method: 'GET',
        path: '/{p*}',
      })

      // Handle error page
      server.ext('onPreResponse', async(
        {path, query, response, raw: {req, res}},
        h,
      ) => {
        if(!response || !('isBoom' in response) || !response.isBoom) {
          return h.continue
        }
        await next.renderError(response, req, res, path, query as RequestQuery)
        return h.close
      })
    },
  },
})
