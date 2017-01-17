import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

class Box extends Component {

  displayIcon() {
    if (this.props.icon) {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center'}}>
          {this.props.icon}
        </View>
      )
    }
  }

  renderSubtitle() {
    if (!this.props.subtitle) {
      return null
    }

    return (
      <Text
        ellipsizeMode='tail'
        numberOfLines={1}
        style={styles.subtitle}
      >
        {this.props.subtitle}
      </Text>
    )
  }

  render() {
    const { width, height } = this.props.style
    let footerHeight = 68
    if (!this.props.subtitle) {
      footerHeight = 48
    }

    return (
      <View style={this.props.style}>
        <Image
          resizeMode='cover'
          style={{ position: 'absolute', height, width }}
          source={{ uri: this.props.imageURL }}
        />
      <View style={[ styles.boxFooter, { width, height: footerHeight }]}>
          <View style={styles.textWrapper}>
            <Text
              ellipsizeMode='tail'
              numberOfLines={1}
              style={styles.title}
            >
              {this.props.title}
            </Text>
            { this.renderSubtitle() }
          </View>
          { this.displayIcon() }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  boxFooter: {
    position: 'absolute',
    bottom: 0,
    height: 68,
    backgroundColor: 'hsla(0, 0%, 0%, 0.4)',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textWrapper: {
    marginLeft: 16,
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    color: '#ffffff',
    fontSize: 18
  },
  subtitle: {
    color: 'hsla(0, 0%, 100%, 0.8)',
    fontSize: 14
  }
})

Box.defaultProps = {
  style: {}
}

export default Box
