import {GraphQLSchema} from 'graphql'
import {makeExecutableSchema} from 'graphql-tools'
import {merge} from 'lodash'
import * as CommonGQL from '../common/graphql'

let context: ReturnType<typeof createContext> | undefined
let rootValue: ReturnType<typeof createRootValue> | undefined
let schema: ReturnType<typeof createSchema> | undefined

/** Context available in resolvers */
export type Context = CommonGQL.Context // & X.Context & Y.Context & ...

/**
 * Build context
 * @return GraphQL context
 */
export function createContext(): Context {
  if(context === undefined) {
    context = {}
  }
  return context
}

/**
 * Build root value
 * @return Root value
 */
export function createRootValue(): {} {
  if(rootValue === undefined) {
    rootValue = {}
  }
  return rootValue
}

/**
 * Build schema
 * @return GraphQL schema
 */
export function createSchema(): GraphQLSchema {
  if(schema === undefined) {
    schema = makeExecutableSchema<Context>({
      resolvers: merge(
        {},
        CommonGQL.resolvers(),
      ),
      typeDefs: [
        CommonGQL.typeDefs,
      ],
    })
  }
  return schema
}
