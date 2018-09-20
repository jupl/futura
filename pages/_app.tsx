import {NextContext} from 'next'
import * as withRedux from 'next-redux-wrapper'
import NextApp, {AppComponentProps, Container} from 'next/app'
import * as React from 'react'
import {Provider} from 'react-redux'
import {Store} from 'redux'
import {createStore} from '../app/store'

interface Props {
  store: Store<{}>
}

interface Context {
  Component: React.ComponentType & {
    getInitialProps?(context: NextContext): Promise<{}>
  }
  ctx: NextContext
}

type InitialProps = Pick<AppComponentProps, 'pageProps'>

class App extends NextApp<Props> {
  static async getInitialProps({ // tslint:disable-line:completed-docs
    Component,
    ctx,
  }: Context): Promise<InitialProps> {
    const pageProps = Component.getInitialProps !== undefined
      ? await Component.getInitialProps(ctx)
      : {}
    return {pageProps}
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
export default withRedux.default(createStore)(App)
