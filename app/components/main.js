import React, { Component } from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import * as reducers from '../modules'

import App from './app'

const middleware = [ thunk ]

console.log('DEV', __DEV__)

if (__DEV__) {
  const createLogger = require('redux-logger')
  const logger = createLogger()
  middleware.push(logger)
}

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)
const reducer = combineReducers(reducers)
const store = createStoreWithMiddleware(reducer)

export default class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
