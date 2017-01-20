import React, { Component } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  ListView,
  Image,
  Dimensions,
  TouchableNativeFeedback
} from 'react-native'

import {
  SharedElement,
  SharedElementGroup,
  withNavigation
} from '@exponent/ex-navigation'

import Icon from 'react-native-vector-icons/MaterialIcons'

import { THEME } from '../../../config'
const { PRIMARY_COLOR, ACCENT_COLOR, SUCCESS_COLOR, ERROR_COLOR } = THEME
const MARGIN_SIZE = 4

import SharedElementCell from './cell'

import Router from '../../../navigation/router'

const ANIMATION_DURATION = 425

function transitionAnimation() {
  return {
    timing: Animated.timing,
    easing: Easing.inOut(Easing.ease),
    duration: ANIMATION_DURATION
  }
}

function animateRows(transitionProps, prevTransitionProps, id, rowsAnimations, items = []) {
  const inverse = transitionProps.scene.index < prevTransitionProps.scene.index
  const animations = []

  const rowInt = items.findIndex((item) => item.id === id)

  items.forEach((item, i) => {
    if (item.id !== id) {
      const anim = rowsAnimations[items[i].id]
      if (anim) {
        animations.push(
          Animated.timing(anim, {
            toValue: inverse ? 0 : (i < rowInt ? -1 : 1),
            duration: ANIMATION_DURATION,
            useNativeDriver: true
          })
        )
      }
    }
  })

  Animated.parallel(animations).start()
}

function groupItems(items, itemsPerRow) {
  const groups = []
  let group = { items: [] }
  items.forEach(function(item, index) {
    if (group.items.length === itemsPerRow) {
      groups.push(group)
      if (item.dontGroup) {
        groups.push({ items: [ item ] })
        group = { items: [] }
      } else {
        group = { items: [ item ] }
      }
    } else {
      group.items.push(item)
    }
  })

  if (group.items.length > 0) {
    group.isLast = true
    groups.push(group)
  }

  return groups
}

class SharedElementGrid extends Component {

  constructor(props) {
    super(props)
    const { height, width } = Dimensions.get('window')

    this.cells = {}
    this.rowsAnimations = {}
    this.state = {
      height,
      width
    }
  }

  onLayout(event){
    const { height, width } = event.nativeEvent.layout;
    this.setState({ height, width })
  }

  getItemSize(group) {
    let { height, width } = this.state

    // Account for margins
    width -= (group.items.length * MARGIN_SIZE)

    const currentWidth =  width/group.items.length
    const currentHeight = width/this.props.itemsPerRow

    return {
      height: currentHeight,
      width: currentWidth
    }
  }

  onGridCellPress (data) {
    this.props.navigator.push(
      Router.getRoute('Detail', { data }), {
        transitionGroup: this.cells[data.id]
      }
    )
  }

  renderGroup(group, sectionId, rowId) {
    const { height, width } = this.getItemSize(group)

    const items = group.items.map((item, index) => {
      // Avoid double margins between list and boxes
      const marginLeft = index > 0 ? MARGIN_SIZE : 0
      const marginBottom = MARGIN_SIZE

      let icon = <Icon name='close' size={44} color={ERROR_COLOR} />
      if (item.status) {
        icon = <Icon name='check' size={44} color={SUCCESS_COLOR} />
      }

      this.rowsAnimations[item.id] = new Animated.Value(0)

      const rowStyle = {
        transform: [{
          translateY: this.rowsAnimations[item.id].interpolate({
            inputRange: [ -1, 0, 1 ],
            outputRange: [ -200, 0, 200 ]
          })
        }]
      }

      return (

        <TouchableNativeFeedback
            key={item.id}
            onPress={() => this.onGridCellPress(item)}
          >
          <Animated.View style={[ { marginLeft, marginBottom, width, height }, rowStyle ]}>
            <SharedElementGroup
              id='header'
              ref={g => { this.cells[item.id] = g }}
              configureTransition={transitionAnimation}
              onTransitionStart={(transitionProps, prevTransitionProps) => {
                animateRows(transitionProps, prevTransitionProps, item.id, this.rowsAnimations, this.props.items)
              }}
            >
              <SharedElement id='image'>
                {(animation) => {
                  return (
                    <Animated.View style={[ { height, width, marginBottom } ]}>
                      <Animated.Image
                        resizeMode='cover'
                        style={{ position: 'absolute' }}
                        source={{ uri: item.image }}
                        style={{ flex: 1 }}
                      />
                    </Animated.View>
                  )
                }}
              </SharedElement>
            </SharedElementGroup>
            <SharedElementCell
              key={item.id}
              style={{ width, height, position: 'absolute' }}
              title={item.title}
              subtitle={item.subtitle}
              icon={icon}
            />
          </Animated.View>
        </TouchableNativeFeedback>

      )

    })

    return (
      <View style={styles.group}>
        {items}
      </View>
    )
  }

  render() {
    var groups = groupItems(this.props.items, this.props.itemsPerRow)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

    return (
      <View
        onLayout={this.onLayout.bind(this)}
        style={{ flex: 1, backgroundColor: PRIMARY_COLOR }}
      >
        <ListView
          {...this.props}
          style={{ marginLeft: MARGIN_SIZE, marginRight: MARGIN_SIZE }}
          renderRow={this.renderGroup.bind(this)}
          dataSource={ds.cloneWithRows(groups)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  box: { },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})

SharedElementGrid.defaultProps = {
  items: [],
  itemsPerRow: 2
}

export default withNavigation(SharedElementGrid)
