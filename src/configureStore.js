import { createStore, applyMiddleware } from 'redux'
import { serviceMiddleware } from 'reservice'
import reducer from './reducers/index'
import { composeWithDevTools } from 'redux-devtools-extension'

const middlewares = [ serviceMiddleware ]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(require('redux-debug')(require('debug')('redux')))
}

const configureStore = (initialState) => {
  const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)))
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers/index'))
    })
  }

  return store
}

export default configureStore
