// tslint:disable:file-name-casing no-default-export
import {ApolloClient, NormalizedCacheObject} from 'apollo-boost'
import NextApp, {
  AppProps,
  Container,
  DefaultAppIProps,
  NextAppContext,
} from 'next/app'
import Head from 'next/head'
import 'normalize.css'
import React from 'react'
import {ApolloProvider, getDataFromTree} from 'react-apollo'
import * as SSR from '~/common/context/ssr'
import {createClient} from '~/common/graphql/client'

interface Props extends AppProps, DefaultAppIProps {
  apollo: NormalizedCacheObject | ApolloClient<{}>
}

/** Next application component */
export default class App extends NextApp<Props> {
  private readonly apollo: ApolloClient<{}>

  // tslint:disable-next-line:completed-docs
  static async getInitialProps({Component, ctx, router}: NextAppContext) {
    const pageProps = Component.getInitialProps !== undefined
      ? await Component.getInitialProps(ctx)
      : {}

    // Construct Apollo cache
    let apollo
    if(process.env.IS_SERVER === 'true') {
      const [{SchemaLink}, {buildSchema}, {resolvers}] = await Promise.all([
        import('apollo-link-schema'),
        import('type-graphql'),
        import('~/app/graphql'),
      ])
      const schema = await buildSchema({resolvers})
      apollo = createClient(new SchemaLink({schema}))
      try {
        await getDataFromTree((
          <App
            Component={Component}
            apollo={apollo}
            pageProps={pageProps}
            router={router}
          />
        ))
      }
      catch(e) {
        console.error('Error while running getDataFromTree', e)
      }
      Head.rewind()
    }

    return {
      pageProps,
      apollo: apollo ? apollo.cache.extract() : {},
    }
  }

  constructor(props: Props) {
    super(props)
    this.apollo = createClient(props.apollo)
  }

  render() { // tslint:disable-line:completed-docs
    const {Component, pageProps} = this.props
    return (
      <>
        <Head>
          <title>Application</title>
        </Head>
        <Container>
          <ApolloProvider client={this.apollo}>
            <SSR.Provider>
              <Component {...pageProps} />
            </SSR.Provider>
          </ApolloProvider>
        </Container>
      </>
    )
  }
}
