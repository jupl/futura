import NextLink, {LinkState} from 'next/link'
import * as React from 'react'

/** Inherited properties */
export type Parent = Pick<LinkState, Exclude<keyof LinkState, 'children'>>

/** Component properties */
export interface Props {
  children?: React.ReactNode
  className?: string
}

/**
 * Render link that is style-component friendly
 * @param props Component properties
 * @return Link
 */
export function Link({className, children, ...props}: Props & Parent) {
  return (
    <NextLink {...props}>
      <a children={children} className={className} />
    </NextLink>
  )
}
