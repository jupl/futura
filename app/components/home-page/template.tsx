import * as React from 'react'
import styled from 'styled-components'

/** Component properties */
export interface Props {
  ssr: boolean
}

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
 * Home page component
 * @return Home page
 */
export const AppHomePage = ({ssr}: Props) => (
  <Container>
    Hello, Next.js from {ssr ? 'server' : 'client'}
  </Container>
)
