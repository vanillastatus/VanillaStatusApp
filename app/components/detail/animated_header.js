import React, { PropTypes, Component } from 'react'
import { View, Animated, StyleSheet } from 'react-native'

class AnimatedHeader extends Component {

  caculateHeaderHeight(scrollDistance) {
    return this.props.animatedScrollPosition.interpolate({
      inputRange: [ 0, scrollDistance ],
      outputRange: [ this.props.maxHeight, this.props.minHeight ],
      extrapolate: 'clamp'
    })
  }

  caculateImageOpacity(scrollDistance) {
    return this.props.animatedScrollPosition.interpolate({
      inputRange: [ 0, scrollDistance / 2, scrollDistance ],
      outputRange: [ 1, 1, 0 ],
      extrapolate: 'clamp'
    })
  }

  caculateImageHeight(scrollDistance) {
    return this.props.animatedScrollPosition.interpolate({
      inputRange: [ 0, scrollDistance ],
      outputRange: [ 0, -50 ],
      extrapolate: 'clamp'
    })
  }

  caculateFontSize(scrollDistance) {
    return this.props.animatedScrollPosition.interpolate({
      inputRange: [ 0, scrollDistance / 2, scrollDistance ],
      outputRange: [ 44, 44, 20 ],
      extrapolate: 'clamp'
    })
  }

  caculatePadLeft(scrollDistance) {
    return this.props.animatedScrollPosition.interpolate({
      inputRange: [ 0, scrollDistance / 2, scrollDistance ],
      outputRange: [ 16, 16, 72 ],
      extrapolate: 'clamp'
    })
  }

  render () {
    const scrollDistance = this.props.maxHeight - this.props.minHeight
    const headerHeight = this.caculateHeaderHeight(scrollDistance)
    const imageOpacity = this.caculateImageOpacity(scrollDistance)
    const imageHeight = this.caculateImageHeight(scrollDistance)
    const paddingLeft = this.caculatePadLeft(scrollDistance)
    const fontSize = this.caculateFontSize(scrollDistance)

    return (
      <Animated.View
        pointerEvents='none'
        style={[
          styles.navbar,
          { backgroundColor: this.props.color },
          { height: headerHeight }
        ]}
      >
        <Animated.Image
          source={{ uri: this.props.image }}
          style={[
            styles.backgroundImage,
            { height: this.props.maxHeight },
            { opacity: imageOpacity, transform: [{ translateY: imageHeight }]}
          ]}
        />
        <Animated.View style={[ styles.bar, { height: headerHeight } ]}>
          <View style={styles.bar}>
            <Animated.Text
              style={[ styles.title, { fontSize, paddingLeft } ]}
            >
              {this.props.title}
            </Animated.Text>
          </View>
        </Animated.View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    elevation: 4,
    zIndex: 4
  },
  bar: {
    height: 350,
    justifyContent: 'flex-end',
    marginBottom: 16
  },
  title: {
    backgroundColor: 'transparent',
    fontWeight: '400',
    fontSize: 22,
    color: 'hsl(0, 0%, 100%)'
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    resizeMode: 'cover'
  }
})

export default AnimatedHeader
