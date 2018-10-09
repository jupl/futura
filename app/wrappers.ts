import {NextContext} from 'next'
import {withData} from 'next-apollo'
import withReduxBase from 'next-redux-wrapper'
import {ComponentType} from 'react'
import {getContext} from '../common/middleware'
import {createLink} from './graphql'
import {createStore} from './store'

let apolloWrapper: ReturnType<typeof withData> | undefined
let reduxWrapper: ReturnType<typeof withReduxBase> | undefined

/**
 * Apollo client wrapper
 * @param component Component to wrap
 * @return Wrapped component
 */
export function withApollo<P>(component: ComponentType<P>) {
  if(apolloWrapper === undefined) {
    apolloWrapper = withData((ctx: NextContext) => ({
      link: process.env.IS_SERVER === 'true'
        ? createLink(getContext(ctx))
        : createLink(),
    })) as Function
  }
  return apolloWrapper(component)
}

/**
 * Redux wrapper
 * @param component Component to wrap
 * @return Wrapped component
 */
export function withRedux<P>(component: ComponentType<P>) {
  if(reduxWrapper === undefined) {
    reduxWrapper = withReduxBase(createStore)
  }
  return reduxWrapper(component)
}
