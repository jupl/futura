import NextApp, {Container, NextAppContext} from 'next/app'
import Head from 'next/head'
import 'normalize.css'
import * as React from 'react'
import {Provider} from 'react-redux'
import {Store} from 'redux'
import {withRedux} from '../app/wrappers'

interface Props {
  store: Store<{}>
}

/** Next application component */
class App extends NextApp<Props> {
  // tslint:disable-next-line:completed-docs
  static async getInitialProps({Component, ctx}: NextAppContext) {
    const pageProps = Component.getInitialProps !== undefined
      ? await Component.getInitialProps(ctx)
      : {}
    return {pageProps}
  }

  render() { // tslint:disable-line:completed-docs
    const {Component, pageProps, store} = this.props
    return (
      <>
        <Head>
          <title>Application</title>
        </Head>
        <Container>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </Container>
      </>
    )
  }
}

// tslint:disable-next-line:no-default-export
export default withRedux(App)
