import plugin from 'h2o2'
import {ServerRegisterPluginObject as Plugin} from 'hapi'

/**
 * Create h2o2 plugin
 * @return Hapi plugin
 */
export const createPlugin = (): Plugin<{}> => ({
  plugin: {
    name: 'common-proxy',
    register: async server => {
      await server.register({plugin})

      // Map routes
      server.route({
        handler: {
          proxy: {
            mapUri: async({raw: {req: {url}}}) => ({
              uri: `http://localhost:3001${url}`,
            }),
            passThrough: true,
          },
        },
        method: 'GET',
        path: '/{p*}',
      })
    },
  },
})
