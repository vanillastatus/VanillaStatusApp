import React, { Component } from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import * as reducers from '../modules'
import { statsPoll } from '../modules/stats'

import Router from '../router'

const middleware = [ thunk ]

if (__DEV__) {
  const createLogger = require('redux-logger')
  const logger = createLogger()
  middleware.push(logger)
}

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)
const reducer = combineReducers(reducers)
const store = createStoreWithMiddleware(reducer)

export default class Main extends Component {
  componentDidMount() {
    store.dispatch(statsPoll(15))
  }

  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}
