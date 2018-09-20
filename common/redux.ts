import {Builders, Types} from 'redux-artificer'

/** Common state */
export type State = typeof initialState

/** Common type for Redux */
export const type = {
  common: {
    client: Types.Flag.New(),
  },
}

const {
  actions: {common: actions},
  initialState,
  selectors: {common: selectors},
} = Builders.build(type)

export {actions, selectors}
