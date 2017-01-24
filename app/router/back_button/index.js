import React, { PropTypes, Component } from 'react'
import {
  View,
  StyleSheet,
  Platform,
  StatusBar
} from 'react-native'
import { Actions } from 'react-native-router-flux'

import Button from './button'

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight : 20
const NAVBAR_HEIGHT = 56

class BackButton extends Component {
  render () {
    return (
      <View style={styles.iconContainer}>
        <View style={styles.iconRadius}>
          <Button />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navbarIcon: {
    width: 24,
    height: 24,
    backgroundColor: 'transparent'
  },
  iconContainer: {
    position: 'absolute',
    left: 0,
    // This basically means bottom: 6 since we can't use bottom values here
    top: STATUS_BAR_HEIGHT + NAVBAR_HEIGHT - (48 + 6),
    elevation: 4,
    zIndex: 25
  },
  iconRadius: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
    borderRadius: 24
  }
})

export default BackButton
