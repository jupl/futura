import {withData} from 'next-apollo'
import {ComponentType} from 'react'
import {createLink} from './graphql'

let wrapper: Function | undefined

/**
 * Create new Apollo client options
 * @param component Component to wrap
 * @return Client instance options
 */
export function withApollo(component: ComponentType) {
  if(wrapper === undefined) {
    wrapper = withData(() => ({
      link: createLink(),
    })) as Function
  }
  return wrapper(component)
}
