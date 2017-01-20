import React, { Component } from 'react'
import {  AppRegistry,  View } from 'react-native'

import {
  NavigationProvider,
  StackNavigation,
  SharedElementOverlay,
} from '@exponent/ex-navigation'

import Router from './app/navigation/router'

export default class ElysiumStatus extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavigationProvider router={Router}>
          <SharedElementOverlay>
            <StackNavigation
              id="root"
              initialRoute={Router.getRoute('Main')}
            />
          </SharedElementOverlay>
        </NavigationProvider>
      </View>

    )
  }
}

AppRegistry.registerComponent('ElysiumStatus', () => ElysiumStatus);
