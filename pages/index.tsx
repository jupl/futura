import * as React from 'react'
import styled from 'styled-components'

// Container component
const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(white, gainsboro);
`

/**
 * Render home page
 * @return home page
 */
// tslint:disable-next-line:no-default-export
export default function HomePage() {
  return <Container>Hello, Next.js</Container>
}
