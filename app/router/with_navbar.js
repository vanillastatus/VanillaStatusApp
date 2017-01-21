import React, { PropTypes, Component } from 'react'
import { Platform, View } from 'react-native'

import Navbar from './navbar'

export default function withNavbar(WrappedComponent, stores, getState) {
  return class ContentView extends Component {
    render () {
      let navbar = null
      if (Platform.OS === 'android') {
        navbar = <Navbar {...this.props} />
      }

      return (
        <View style={{ flex: 1 }}>
          {navbar}
          <WrappedComponent {...this.props} />
        </View>
      )
    }
  }
}
