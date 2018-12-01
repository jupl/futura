import React, {ComponentType} from 'react'

/** Omit properties */
export type Omit<T, K> = Pick<T, Exclude<keyof T, keyof K>>

/**
 * Wrap component to inject context data
 * @param Context React context
 * @return Component wrapper
 */
export function withContext<C>(Context: React.Context<C>) {
  return function Component<P>(Child: ComponentType<C & Omit<P, C>>) {
    return (props: Omit<P, C>) => (
      <Context.Consumer>
        {context => <Child {...context} {...props} />}
      </Context.Consumer>
    )
  }
}
