import * as React from 'react'

/** Props injected into component */
export interface Context {
  ssr: boolean
}

/** Initial context value */
export const INITIAL_CONTEXT: Context = {
  ssr: true,
}

/** Context */
export const Context = React.createContext(INITIAL_CONTEXT)
export const {Consumer} = Context

/** Provider implementation */
export class Provider extends React.Component {
  /** Initial state */
  state = INITIAL_CONTEXT

  componentDidMount() {
    this.setState({ssr: false})
  }

  render() { // tslint:disable-line:completed-docs
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}
