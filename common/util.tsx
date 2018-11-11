import * as React from 'react'

/** Omit properties */
export type Omit<T, K> = Pick<T, Exclude<keyof T, keyof K>>

/**
 * Wrap component to inject context data
 * @param Context React context
 * @return Component wrapper
 */
export const withContext = <C extends {}>(Context: React.Context<C>) =>
  <P extends {}>(
    Component: React.ComponentType<P & C>,
  ): React.ComponentType<Omit<P, C>> =>
    props => (
      <Context.Consumer>
        {context => <Component {...context} {...props} />}
      </Context.Consumer>
    )
