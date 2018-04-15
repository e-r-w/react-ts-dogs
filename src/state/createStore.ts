import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import dogs, { Dogs } from './dogs'

export type StateTree = {
  dogs: Dogs
}

export default () => createStore(
  combineReducers({
    dogs
  }),
  applyMiddleware(thunk)
)
