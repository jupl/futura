import {ApolloLink} from 'apollo-link'
import {NextContext} from 'next'
import {withData} from 'next-apollo'
import {ComponentType} from 'react'

let wrapper: Function | undefined

/** GraphQL URL */
export const GRAPHQL_URL = '/graphql'

/**
 * Create new Apollo client options
 * @param component Component to wrap
 * @return Client instance options
 */
export function withApollo(component: ComponentType) {
  if(wrapper === undefined) {
    wrapper = withData((context: NextContext) => ({
      link: createLink(context),
    })) as Function
  }
  return wrapper(component)
}

function createLink(_context: NextContext): ApolloLink {
  // TODO add back typeof import once fixed in Babel
  if(process.env.IS_SERVER === 'true') {
    const {SchemaLink} = require('apollo-link-schema')
    const GraphQL = require('./graphql')
    return new SchemaLink({
      context: GraphQL.createContext(),
      rootValue: GraphQL.createRootValue(),
      schema: GraphQL.createSchema(),
    })
  }
  else {
    const {createHttpLink} = require('apollo-link-http')
    return createHttpLink({uri: GRAPHQL_URL})
  }
}
