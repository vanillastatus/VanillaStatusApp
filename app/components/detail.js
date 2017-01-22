import React, { PropTypes, Component } from 'react'
import { View, Text, ScrollView, Image, Animated, StyleSheet, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { THEME } from '../config'
const { PRIMARY_COLOR } = THEME

// {/* <Image
//   resizeMode='cover'
//   style={{ height: 350 }}
//   source={{ uri: this.props.image }}
// />  */}

const HEADER_MAX_HEIGHT = 350
const HEADER_MIN_HEIGHT = StatusBar.currentHeight + 56
const HEADER_SCROLL_DISTANCE =  HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

class Detail extends Component {
  constructor(props) {
    super(props)

    this.state ={
      scrollY: new Animated.Value(0)
    }
  }

  renderContent() {
    const data = Array.from({length: 30})
    return (
      <View style={{ paddingTop: HEADER_MAX_HEIGHT}}>
        {data.map((_, i) =>
          <View key={i} style={{ height: 40, backgroundColor: 'rgb(255, 255, 255)'}}>
            <Text>{i}</Text>
          </View>
        )}
      </View>
    )
  }

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [ 0, HEADER_SCROLL_DISTANCE ],
      outputRange: [ HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT ],
      extrapolate: 'clamp'
    })

    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [ 0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE ],
      outputRange: [ 1, 1, 0 ],
      extrapolate: 'clamp',
    })

    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [ 0, HEADER_SCROLL_DISTANCE ],
      outputRange: [ 0, -50 ],
      extrapolate: 'clamp',
    })

    const fontSizeTranslate = this.state.scrollY.interpolate({
      inputRange: [ 0, HEADER_SCROLL_DISTANCE ],
      outputRange: [ 44, 20 ],
      extrapolate: 'clamp',
    })

    const padLeftTranslate = this.state.scrollY.interpolate({
      inputRange: [ 0, HEADER_SCROLL_DISTANCE ],
      outputRange: [ 16, 72 ],
      extrapolate: 'clamp',
    })

    const navbarElevation = this.state.scrollY.interpolate({
      inputRange: [ 0, HEADER_SCROLL_DISTANCE ],
      outputRange: [ 0, 4 ],
      extrapolate: 'clamp',
    })

    return (
      <View style={{ flex: 1, backgroundColor: PRIMARY_COLOR }}>
        <ScrollView
          style={{ flex: 1 }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [ { nativeEvent: { contentOffset: { y: this.state.scrollY }}} ]
          )}
        >
          {this.renderContent()}
        </ScrollView>
        <Animated.View style={[ styles.navbar, { height: headerHeight, elevation: navbarElevation }]}>
          <Animated.Image
            style={[
              styles.backgroundImage,
              { opacity: imageOpacity, transform: [{ translateY: imageTranslate }]}
            ]}
            source={{ uri: this.props.image }}
          />
          <View style={styles.navbarIcon}>
            <Icon name='arrow-back' size={24} color={'#ffffff'} />
          </View>
          <Animated.View style={[ styles.bar, { height: headerHeight } ]}>
            <View style={styles.bar}>
              <Animated.Text style={[styles.title, { fontSize: fontSizeTranslate, paddingLeft: padLeftTranslate } ]}>{this.props.title}</Animated.Text>
            </View>
          </Animated.View>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: PRIMARY_COLOR,
    overflow: 'hidden'
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
  navbarIcon: {
    left: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    paddingLeft: 16,
    paddingTop: StatusBar.currentHeight + 16
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover'
  }
})
export default Detail
