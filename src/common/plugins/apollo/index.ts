import {ApolloServer, Config} from 'apollo-server-hapi'
import {ServerRegisterPluginObject as Plugin} from 'hapi'

/**
 * Apollo plugin
 * @param options Apollo server options
 * @return Hapi plugin
 */
export const plugin = (options: Config): Plugin<Config> => ({
  options,
  plugin: {
    name: 'apollo',
    register: async(server, config) => {
      const apollo = new ApolloServer(config)
      await apollo.applyMiddleware({app: server})
      if(config.subscriptions !== false) {
        apollo.installSubscriptionHandlers(server.listener)
      }
    },
  },
})
