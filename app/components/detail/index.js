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
import AnimatedHeader from './animated_header'

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

  onScroll() {
    return Animated.event([ { nativeEvent: { contentOffset: { y: this.state.scrollY }}} ])
  }

  render() {

    return (
      <View style={{ flex: 1, backgroundColor: PRIMARY_COLOR }}>
        <AnimatedHeader
          title={this.props.title}
          image={this.props.image}
          color={PRIMARY_COLOR}
          maxHeight={HEADER_MAX_HEIGHT}
          minHeight={HEADER_MIN_HEIGHT}
          animatedScrollPosition={this.state.scrollY}
        />
        <View style={{ flex: 1, backgroundColor: PRIMARY_COLOR }}>
          <ScrollView
            style={{ flex: 1 }}
            scrollEventThrottle={16}
            onScroll={this.onScroll()}
          >
            <View style={{ paddingTop: HEADER_MAX_HEIGHT }}>
              <DetailContent {...this.props} />
            </View>
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
