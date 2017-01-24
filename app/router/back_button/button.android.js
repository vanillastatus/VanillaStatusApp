import React, { PropTypes, Component } from 'react'
import {
  View,
  StyleSheet,
  TouchableNativeFeedback
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Actions } from 'react-native-router-flux'

class Button extends Component {
  render () {
    return (
      <TouchableNativeFeedback
        hitSlop={{ top: 24, bottom: 24, left: 24, right: 24 }}
        background={TouchableNativeFeedback.Ripple('#ffffff', true)}
        onPress={() => Actions.pop()}
      >
        <View style={styles.icon}>
          <Icon name='arrow-back' size={24} color={'#ffffff'} />
        </View>
      </TouchableNativeFeedback>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    backgroundColor: 'transparent'
  }
})

export default Button
