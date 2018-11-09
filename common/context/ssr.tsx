import * as React from 'react'
import {Omit} from '../util'

/** Props injected into component */
export interface Props {
  ssr: boolean
}

/** Context value */
export type Value = boolean

/** Context */
export const Context = React.createContext<Value>(true)
export const {Consumer} = Context

/** Provider implementation */
export class Provider extends React.Component {
  /** Initial state */
  state = {ssr: true}

  componentDidMount() {
    this.setState({ssr: false})
  }

  render() { // tslint:disable-line:completed-docs
    return (
      <Context.Provider value={this.state.ssr}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

type Wrapped<T> = React.ComponentType<Omit<T, Props>>
type Wrappee<T> = React.ComponentType<T & Props>

/**
 * Wrap component to inject context data
 * @param Comp React component
 * @return Component with injection
 */
export const wrap = <T extends {}>(Comp: Wrappee<T>): Wrapped<T> => props => (
  <Context.Consumer>
    {ssr => <Comp {...props} ssr={ssr} />}
  </Context.Consumer>
)
