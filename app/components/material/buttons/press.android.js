import React, { PropTypes, Component } from 'react'
import { View, TouchableNativeFeedback } from 'react-native'

class Press extends Component {
  render () {
    return (
      <TouchableNativeFeedback
        useForeground={TouchableNativeFeedback.canUseNativeForeground()}
        background={TouchableNativeFeedback.Ripple('#ffffff', true)}
        onPress={this.props.onPress}
      >
        {this.props.children}
      </TouchableNativeFeedback>
    )
  }
}

Press.defaultProps = {
  onPress: () => { console.log('onPress: function was not defined')}
}

export default Press
