import {IResolvers} from 'graphql-tools'

/** Schema definition */
export const typeDef = `
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
 * Schema definition
 * @return Composite schema definition
 */
export function typeDefs() {
  return [typeDef]
}

/**
 * Resolvers generator
 * @return Resolvers
 */
export function resolvers(): IResolvers<{}, Context> {
  return {}
}
