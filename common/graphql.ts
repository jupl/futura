import {IResolvers} from 'graphql-tools'

/** Schema definition */
export const typeDefs = `
  schema {
    mutation: Mutation
    query: Query
  }

  type Mutation {
    _: Boolean
  }

  type Query {
    _: Boolean
  }
`

/** Context for resolvers */
// tslint:disable-next-line:no-empty-interface
export interface Context {}

/**
 * Resolvers generator
 * @return Resolvers
 */
export function resolvers(): IResolvers<{}, Context> {
  return {}
}
