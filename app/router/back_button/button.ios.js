import React, { PropTypes, Component } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Actions } from 'react-native-router-flux'

class Button extends Component {
  render () {
    return (
      <TouchableOpacity
        hitSlop={{ top: 24, bottom: 24, left: 24, right: 24 }}
        onPress={() => Actions.pop()}
      >
        <View style={styles.icon}>
          <Icon name='arrow-back' size={24} color={'#ffffff'} />
        </View>
      </TouchableOpacity>
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
