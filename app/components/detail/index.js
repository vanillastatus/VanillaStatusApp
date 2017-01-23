import React, { PropTypes, Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  Animated,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Actions } from 'react-native-router-flux'

import DetailContent from './detail_content'

import { THEME } from '../../config'
const { PRIMARY_COLOR } = THEME

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight : 20
const NAVBAR_HEIGHT = 56
const HEADER_MAX_HEIGHT = 350
const HEADER_MIN_HEIGHT = STATUS_BAR_HEIGHT + NAVBAR_HEIGHT
const HEADER_SCROLL_DISTANCE =  HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

class Detail extends Component {
  constructor(props) {
    super(props)

    this.state ={
      scrollY: new Animated.Value(0)
    }
  }

  renderBackButton() {
    return Platform.select({
      ios: () => (
        <TouchableOpacity
          hitSlop={{ top: 24, bottom: 24, left: 24, right: 24 }}
          onPress={() => Actions.pop()}
        >
          <View style={styles.navbarIcon}>
            <Icon name='arrow-back' size={24} color={'#ffffff'} />
          </View>
        </TouchableOpacity>
      ),
      android: () => (
        <TouchableNativeFeedback
          hitSlop={{ top: 24, bottom: 24, left: 24, right: 24 }}
          background={TouchableNativeFeedback.Ripple('#ffffff', true)}
          onPress={() => Actions.pop()}
        >
          <View style={styles.navbarIcon}>
            <Icon name='arrow-back' size={24} color={'#ffffff'} />
          </View>
        </TouchableNativeFeedback>
      )
    })()
  }

  renderContent() {
    return (
      <View style={{ paddingTop: HEADER_MAX_HEIGHT }}>
        <DetailContent {...this.props} />
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
      extrapolate: 'clamp'
    })

    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [ 0, HEADER_SCROLL_DISTANCE ],
      outputRange: [ 0, -50 ],
      extrapolate: 'clamp'
    })

    const fontSizeTranslate = this.state.scrollY.interpolate({
      inputRange: [ 0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE ],
      outputRange: [ 44, 44, 20 ],
      extrapolate: 'clamp'
    })

    const padLeftTranslate = this.state.scrollY.interpolate({
      inputRange: [ 0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE ],
      outputRange: [ 16, 16, 72 ],
      extrapolate: 'clamp'
    })

    return (
      <View style={{ flex: 1, backgroundColor: PRIMARY_COLOR }}>
        <Animated.View
          pointerEvents='none'
          style={[ styles.navbar, { height: headerHeight, elevation: 4, zIndex: 4 }]}>
          <Animated.Image
            style={[
              styles.backgroundImage,
              { opacity: imageOpacity, transform: [{ translateY: imageTranslate }]}
            ]}
            source={{ uri: this.props.image }}
          />
          <Animated.View style={[ styles.bar, { height: headerHeight } ]}>
            <View style={styles.bar}>
              <Animated.Text
                style={[ styles.title, { fontSize: fontSizeTranslate, paddingLeft: padLeftTranslate } ]}
              >
                {this.props.title}
              </Animated.Text>
            </View>
          </Animated.View>
        </Animated.View>
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
        </View>
        <View style={styles.iconContainer}>
          <View style={styles.iconRadius}>
            {this.renderBackButton()}
          </View>
        </View>
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
