import {ApolloServer, Config as ApolloConfig} from 'apollo-server-hapi'
import {ServerRegisterPluginObject as Plugin} from 'hapi'
import {BuildSchemaOptions, buildSchema} from 'type-graphql'

type BaseConfig = Pick<ApolloConfig, Exclude<keyof ApolloConfig, 'resolvers'>>
interface Config extends BaseConfig {
  resolvers: BuildSchemaOptions['resolvers']
}

/**
 * Create Apollo plugin
 * @param options Apollo server options
 * @return Hapi plugin
 */
export const createPlugin = (options: Config): Plugin<Config> => ({
  options,
  plugin: {
    name: 'common-apollo',
    register: async(server, {resolvers, ...config}) => {
      const schema = await buildSchema({resolvers})
      const apollo = new ApolloServer({...config, schema})
      await apollo.applyMiddleware({app: server})
      if(config.subscriptions !== false) {
        apollo.installSubscriptionHandlers(server.listener)
      }
    },
  },
})
