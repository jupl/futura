import withRedux from 'next-redux-wrapper'
import NextApp, {AppProps, Container, NextAppContext} from 'next/app'
import * as React from 'react'
import {Provider} from 'react-redux'
import {Store} from 'redux'
import {createStore} from '../app/store'

interface Props {
  store: Store<{}>
}

/** Next application component */
class App extends NextApp<Props> {
  static async getInitialProps({ // tslint:disable-line:completed-docs
    Component,
    ctx,
    router,
  }: NextAppContext): Promise<AppProps> {
    const pageProps = Component.getInitialProps !== undefined
      ? await Component.getInitialProps(ctx)
      : {}
    return {Component, pageProps, router}
  }

  render() { // tslint:disable-line:completed-docs
    const {Component, pageProps, store} = this.props
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

// tslint:disable-next-line:no-default-export
export default withRedux(createStore)(App)
