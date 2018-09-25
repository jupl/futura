import {ApolloLink} from 'apollo-link'
import {GraphQLSchema} from 'graphql'
import {makeExecutableSchema} from 'graphql-tools'
import {merge} from 'lodash'
import * as CommonGQL from '../common/graphql'

interface Config {
  context: Context
  rootValue: {}
  schema: GraphQLSchema
}

let config: Config | undefined
let link: ApolloLink | undefined

/** Context available in resolvers */
export type Context = CommonGQL.Context // & X.Context & Y.Context & ...

/** GraphQL URL */
export const GRAPHQL_URL = '/graphql'

/**
 * Build GraphQL config
 * @return GraphQL config
 */
export function createConfig() {
  if(config === undefined) {
    config = {
      context: {},
      rootValue: {},
      schema: makeExecutableSchema<Context>({
        resolvers: merge({},
          CommonGQL.resolvers(),
        ),
        typeDefs: [
          CommonGQL.typeDefs,
        ],
      }),
    }
  }
  return config
}

/**
 * Create apollo link
 * @return Apollo link
 */
export function createLink(): ApolloLink {
  if(link === undefined) {
    // TODO add back typeof import once fixed in Babel
    if(process.env.IS_SERVER === 'true') {
      const {SchemaLink} = require('apollo-link-schema')
      link = new SchemaLink(createConfig()) as ApolloLink
    }
    else {
      const {HttpLink} = require('apollo-link-http')
      link = new HttpLink({uri: GRAPHQL_URL}) as ApolloLink
    }
  }
  return link
}
