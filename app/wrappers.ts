import {withData} from 'next-apollo'
import withReduxBase from 'next-redux-wrapper'
import {ComponentType} from 'react'
import {createLink} from './graphql'
import {createStore} from './store'

let apolloWrapper: ReturnType<typeof withData> | undefined
let reduxWrapper: ReturnType<typeof withReduxBase> | undefined

/**
 * Apollo client wrapper
 * @param component Component to wrap
 * @return Wrapped component
 */
export function withApollo(component: ComponentType) {
  if(apolloWrapper === undefined) {
    apolloWrapper = withData(() => ({
      link: createLink(),
    })) as Function
  }
  return apolloWrapper(component)
}

/**
 * Redux wrapper
 * @param component Component to wrap
 * @return Wrapped component
 */
export function withRedux(component: ComponentType) {
  if(reduxWrapper === undefined) {
    reduxWrapper = withReduxBase(createStore)
  }
  return reduxWrapper(component)
}
