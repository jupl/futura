import {Plugin} from 'hapi'
import Next from 'next'

/** Next plugin */
export const plugin: Plugin<Next.Server> = {
  name: 'next',
  register: (server, next) => {
    const handler = next.getRequestHandler()
    server.route({
      handler: async({raw: {req, res}, url}, {close}) => {
        await handler(req, res, url)
        return close
      },
      method: 'GET',
      path: '/{p*}',
    })
  },
}
