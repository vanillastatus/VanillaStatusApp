import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

class Box extends Component {
  render() {
    return (
      <View style={this.props.style}>
        <Image
          resizeMode='cover'
          style={{ height: this.props.style.height, width: this.props.style.height }}
          source={{ uri: this.props.imageURL }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({

})

Box.defaultProps = {
  style: {}
}

export default Box
