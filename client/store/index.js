import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import products from './products'
import cart from './cart'
import {saveState, loadState} from '../../localStorage'
import throttle from 'lodash/throttle'

const reducer = combineReducers({user, products, cart})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const persistedState = loadState()

export const store = createStore(reducer, persistedState, middleware)

store.subscribe(
  throttle(() => {
    saveState({
      cart: store.getState().cart
    })
  }, 1000)
)
// because stringify is such an expensive operation we are making sure that we are not constantly updating, but rather only every second.
// listening to any state changes

export default store
export * from './user'
