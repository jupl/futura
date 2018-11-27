import React, {ComponentType} from 'react'

/** Omit properties */
export type Omit<T, K> = Pick<T, Exclude<keyof T, keyof K>>

/**
 * Wrap component to inject context data
 * @param Context React context
 * @return Component wrapper
 */
export const withContext = <C extends {}>(Context: React.Context<C>) =>
  <P extends {}>(Component: ComponentType<P & C>) =>
    (props: Omit<P, C>) => (
      <Context.Consumer>
        {context => <Component {...context} {...props} />}
      </Context.Consumer>
    )
