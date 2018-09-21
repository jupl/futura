import {makeExecutableSchema} from 'graphql-tools'
import {merge} from 'lodash'
import * as CommonGQL from '../common/graphql'

/** Context available in resolvers */
export type Context = CommonGQL.Context // & X.Context & Y.Context & ...

/**
 * Build context
 * @return GraphQL context
 */
export function createContext(): Context {
  return {}
}

/**
 * Build root value
 * @return Root value
 */
export function createRootValue() {
  return {}
}

/**
 * Build schema
 * @return GraphQL schema
 */
export function createSchema() {
  return makeExecutableSchema<Context>({
    resolvers: merge(
      {},
      CommonGQL.resolvers(),
    ),
    typeDefs: [
      CommonGQL.typeDefs,
    ],
  })
}
