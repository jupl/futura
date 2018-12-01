import {ServerRegisterPluginObject as Plugin} from 'hapi'
import Next, {ServerOptions} from 'next'

/**
 * Next.js plugin
 * @param options Next.js server options
 * @return Hapi plugin
 */
export const plugin = (options?: ServerOptions): Plugin<ServerOptions> => ({
  options,
  plugin: {
    name: 'next',
    register: async(server, config) => {
      const next = Next(config)
      const handler = next.getRequestHandler()
      await next.prepare()

      // Map routes
      server.route({
        handler: async({raw: {req, res}, url}, {close}) => {
          await handler(req, res, url)
          return close
        },
        method: 'GET',
        path: '/{p*}',
      })
    },
  },
})
