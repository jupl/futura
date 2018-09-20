import {Builders} from 'redux-artificer'
import * as Common from '../common/redux'

/** Application state */
export type State = typeof initialState

/** Application type for Redux */
export const type = {
  ...Common.type,
}

const {actions, initialState, reducer, selectors} = Builders.build(type)

export {actions, reducer, selectors}
