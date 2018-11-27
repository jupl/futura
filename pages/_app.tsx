import NextApp, {Container, NextAppContext} from 'next/app'
import Head from 'next/head'
import 'normalize.css'
import React from 'react'
import * as SSR from '~/common/context/ssr'

/** Next application component */
// tslint:disable-next-line:no-default-export
export default class App extends NextApp {
  // tslint:disable-next-line:completed-docs
  static async getInitialProps({Component, ctx}: NextAppContext) {
    const pageProps = Component.getInitialProps !== undefined
      ? await Component.getInitialProps(ctx)
      : {}
    return {pageProps}
  }

  render() { // tslint:disable-line:completed-docs
    const {Component, pageProps} = this.props
    return (
      <>
        <Head>
          <title>Application</title>
        </Head>
        <Container>
          <SSR.Provider>
            <Component {...pageProps} />
          </SSR.Provider>
        </Container>
      </>
    )
  }
}
