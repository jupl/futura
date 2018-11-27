import * as SSR from '~/common/context/ssr'
import {withContext} from '~/common/util'
import * as Template from './template'

/** Wrapped application home page component */
export const AppHomePage = withContext(SSR.Context)(Template.AppHomePage)
