import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloClient} from 'apollo-client'
import {ApolloLink} from 'apollo-link'
import {GraphQLSchema} from 'graphql'
import {makeExecutableSchema} from 'graphql-tools'
import {Context as KoaContext} from 'koa'
import {merge} from 'lodash'
import * as CommonGQL from '../common/graphql'

interface Config {
  rootValue: {}
  schema: GraphQLSchema
  context: Context | ((ctx: KoaContext) => Context)
}

let config: Config | undefined
let link: ApolloLink | undefined

/** Context available in resolvers */
export type Context = CommonGQL.Context // & X.Context & Y.Context & ...

/** GraphQL URL */
export const GRAPHQL_URL = '/graphql'

/**
 * Build Apollo client
 * @param ctx Koa context
 * @return Apollo client
 */
export function createClient(ctx: KoaContext) {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: createLink(ctx),
    ssrMode: process.env.IS_SERVER === 'true',
  })
}

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
        resolvers: merge(
          {},
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
 * @param ctx Koa context
 * @return Apollo link
 */
export function createLink(ctx?: KoaContext): ApolloLink {
  // TODO add back typeof import once fixed in Babel
  if(process.env.IS_SERVER === 'true') {
    const {SchemaLink} = require('apollo-link-schema')
    const opts = createConfig()
    let context: Context | undefined
    if(typeof opts.context === 'object') {
      context = opts.context
    }
    else if(ctx !== undefined) {
      context = opts.context(ctx)
    }
    return new SchemaLink({...opts, context}) as ApolloLink
  }
  else if(link === undefined) {
    const {HttpLink} = require('apollo-link-http')
    link = new HttpLink({uri: GRAPHQL_URL}) as ApolloLink
  }
  return link
}
