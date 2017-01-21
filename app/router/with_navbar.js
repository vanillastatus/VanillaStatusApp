import React, { PropTypes, Component } from 'react'

import Navbar from './navbar'

export default function withNavbar(WrappedComponent, stores, getState) {
  return class ContentView extends Component {
    render () {
      <View style={{ flex: 1 }}>
        <Navbar {...this.props} />
        <WrappedComponent {...this.props} />
      </View>
    }
  }
}

export default withNavbar
