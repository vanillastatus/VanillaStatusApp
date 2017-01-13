import React, { Component } from 'react'
import {  AppRegistry } from 'react-native'

import Main from './app/components/main'

export default class ElysiumStatus extends Component {
  render() {
    return <Main />
  }
}

AppRegistry.registerComponent('ElysiumStatus', () => ElysiumStatus);
