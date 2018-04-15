import * as React from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import createStore from './src/state/createStore'

export const replaceRouterComponent = ({
  history
}) => {
  const store = createStore()

  return ({ children }) => (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  )
};
