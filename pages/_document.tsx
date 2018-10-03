import {kebabCase} from 'lodash'
import NextDocument, {
  Head,
  Main,
  NextDocumentContext,
  NextScript,
} from 'next/document'
import * as React from 'react'
import {ServerStyleSheet} from 'styled-components'

const VIEWPORT = Object.entries({
  height: 'device-height',
  initialScale: 1,
  minimumScale: 1,
  width: 'device-width',
}).map(([key, value]) => `${kebabCase(key)}=${value}`).join()

interface Props {
  styleTags: React.ReactElement<{}>[]
}

/** Component representing document structure */
// tslint:disable-next-line:no-default-export
export default class Document extends NextDocument<Props> {
  /**
   * Set up styled-components server-side
   * @return Component properties
   */
  static getInitialProps({renderPage}: NextDocumentContext) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles((
      <App {...props} />
    )))
    const styleTags = sheet.getStyleElement()
    return {...page, styleTags}
  }

  render() { // tslint:disable-line:completed-docs
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta name="viewport" content={VIEWPORT} />
          <link rel="stylesheet" href="/_next/static/style.css" />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
