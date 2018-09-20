import * as Redux from 'redux'
import {enableBatching} from 'redux-batched-actions'
import {devToolsEnhancer} from 'redux-devtools-extension/logOnlyInProduction'
import {State, actions, reducer} from './redux'

let onHotReload = () => {
  // Empty
}

// tslint:disable-next-line:strict-boolean-expressions
if(process.env.IS_SERVER !== 'true' && module.hot) {
  module.hot.accept('./redux', updateReducer)
}

/**
 * Create new store instance
 * @param initialState Initial state to hydrate store with
 * @param options Options provided from next-redux-wrapper
 * @return Store instance
 */
export function createStore() {
  const enhancer = devToolsEnhancer({})
  const store: Redux.Store<State> = Redux.createStore(
    enableBatching(reducer),
    undefined!,
    enhancer,
  )
  if(process.env.IS_SERVER !== 'true') {
    onHotReload = () => store.replaceReducer(reducer)
    setTimeout(() => store.dispatch(actions.common.client.on()))
  }
  return store
}

function updateReducer() {
  onHotReload()
}
