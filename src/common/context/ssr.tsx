import React, {Component, createContext} from 'react'

/** Props injected into component */
export interface Context {
  ssr: boolean
}

/** Context */
export const Context = createContext<Context>(undefined!)

/** Provider implementation */
export class Provider extends Component<{}, Context> {
  /** Initial state */
  state: Context = {ssr: true}

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
