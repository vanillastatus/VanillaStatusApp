import React, { PropTypes, Component } from 'react'
import {
  View,
  ScrollView,
  Animated,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native'

import DetailContent from './detail_content'
import AnimatedHeader from './animated_header'
import BackButton from '../../router/back_button'

import { THEME } from '../../config'
const { PRIMARY_COLOR } = THEME

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight : 20
const NAVBAR_HEIGHT = 56
const HEADER_MAX_HEIGHT = 350
const HEADER_MIN_HEIGHT = STATUS_BAR_HEIGHT + NAVBAR_HEIGHT

class Detail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      scrollY: new Animated.Value(0)
    }
  }

  onScroll() {
    // returns a callback function that sets scrollY state form listening to scroll events
    return Animated.event([ { nativeEvent: { contentOffset: { y: this.state.scrollY }}} ])
  }

  render() {

    return (
      <View style={styles.fill}>
        <AnimatedHeader
          title={this.props.title}
          image={this.props.image}
          color={PRIMARY_COLOR}
          maxHeight={HEADER_MAX_HEIGHT}
          minHeight={HEADER_MIN_HEIGHT}
          animatedScrollPosition={this.state.scrollY}
        />
        <ScrollView
          style={styles.fill}
          contentContainerStyle={styles.contentContainerStyle}
          scrollEventThrottle={16}
          onScroll={this.onScroll()}
        >
          <DetailContent {...this.props} />
        </ScrollView>
        <BackButton />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR
  },
  contentContainerStyle: {
    paddingTop: HEADER_MAX_HEIGHT
  }
})

export default Detail
