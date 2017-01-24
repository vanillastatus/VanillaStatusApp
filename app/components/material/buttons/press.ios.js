import React, { PropTypes, Component } from 'react'
import { View, TouchableHighlight } from 'react-native'

class Press extends Component {
  render () {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        {this.props.children}
      </TouchableHighlight>
    )
  }
}

Press.defaultProps = {
  onPress: () => { console.log('onPress: function was not defined')}
}

export default Press
