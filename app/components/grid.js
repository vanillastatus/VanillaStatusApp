import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  ListView,
  Image,
  Platform
} from 'react-native';

import Dimensions from 'Dimensions'
import { Actions as RouterActions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { THEME } from '../config'
const { PRIMARY_COLOR, BACKGROUND_COLOR, ACCENT_COLOR, SUCCESS_COLOR, ERROR_COLOR } = THEME
const MARGIN_SIZE = 4

import Box from './material/box'
import Header from './header'

// helpers
const fillRow = (startIndex, items, itemsPerRow, skip) => {
  const row = []
  for (i = startIndex; i < items.length; i++) {
    if (items[i].dontGroup || row.length === itemsPerRow) {
      break
    }

    row.push(items[i])
    skip[items[i].id] = true
  }

  return row
}

class Grid extends Component {

  constructor(props) {
    super(props)
    const { height, width } = Dimensions.get('window')
    this.renderGroup = this.renderGroup.bind(this)

    this.state = {
      height,
      width
    }
  }

  onLayout(event){
    const { height, width } = event.nativeEvent.layout;
    this.setState({ height, width })
  }

  groupItems(items, itemsPerRow) {
    const headers = {
      // lightshope: 0
      // elysium: 3
    }
    const groups = []
    // Enables ability to skip already grouped items
    const skip = {  /* item.id: 'id' */ }

    items.forEach(function(item, index) {
      if (skip[item.id]) {
        return
      }

      if (item.organizationId && typeof headers[item.organizationId] === 'undefined') {
        headers[item.organizationId] = groups.length
        groups.push({ organizationId: item.organizationId, header: true })
      }

      if (item.dontGroup) {
        groups.push({ items: [ item ]})
      } else {
        groups.push({ items: fillRow(index, items, itemsPerRow, skip)})
      }
    })

    return groups
  }

  getHeaderSize() {
    let { height, width } = this.state
    let modifier = 1
    if (height < width) {
      // support maxWidth center container
      // modifier = 1.5
    }

    // Account for margins
    width -= (1 * MARGIN_SIZE)

    const currentWidth =  width/modifier
    const currentHeight = 64/modifier

    const margin = (width - currentWidth) / 2

    return {
      height: currentHeight,
      width: currentWidth,
      marginLeft: margin,
      marginRight: margin
    }
  }

  getItemSize(group) {
    let { height, width } = this.state
    let modifier = 1
    if (height < width) {
      // support maxWidth center container
      // modifier = 1.5
    }

    // Account for margins
    width -= (group.items.length * MARGIN_SIZE)

    const currentWidth =  (width/group.items.length)/modifier
    const currentHeight = (width/this.props.itemsPerRow)/modifier


    return {
      height: currentHeight,
      width: currentWidth
    }
  }

  renderGroup(group) {
    if (group.header) {
      const { height, width, marginLeft, marginRight } = this.getHeaderSize()
      console.log(height, width)
      return (
        <View style={{ marginLeft, marginRight, width }}>
          <Header organizationId={group.organizationId} />
        </View>
      )
    }

    const { height, width } = this.getItemSize(group)

    const items = group.items.map((item, index) => {
      // Avoid double margins between list and boxes
      const marginLeft = index > 0 ? MARGIN_SIZE : 0

      const marginBottom = MARGIN_SIZE

      let icon = <Icon name='close' size={44} color={ERROR_COLOR} />
      if (item.status) {
        icon = <Icon name='check' size={44} color={SUCCESS_COLOR} />
      }

      return (
        <Box
          key={item.id}
          style={{ marginLeft, marginBottom, width, height, borderRadius: 2 }}
          title={item.title}
          subtitle={item.subtitle}
          onPress={() => { RouterActions.detail({ id: item.id }) }}
          imageURL={item.image}
          icon={icon}
        />
      )

    })

    return (
      <View style={styles.group}>
        {items}
      </View>
    )
  }

  render() {
    var groups = this.groupItems(this.props.items, this.props.itemsPerRow);
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

    const { width } = this.getHeaderSize()

    return (
      <View
        onLayout={this.onLayout.bind(this)}
        style={{ flex: 1, backgroundColor: 'transparent' }}
      >
        <ListView
          {...this.props}
          contentContainerStyle={{ top: Platform.select({ android: 0, ios: 76 }) }}
          style={{ marginLeft: MARGIN_SIZE, marginRight: MARGIN_SIZE }}
          renderRow={this.renderGroup}
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

Grid.defaultProps = {
  items: [],
  itemsPerRow: 2
}

export default Grid
