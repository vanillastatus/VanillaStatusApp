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
        if (item.dontGroup) {
          groups.push({ items: [ item ] })
        } else {
          group.items.push(item)
        }
      }
    })

    if (group.items.length > 0) {
      group.isLast = true
      groups.push(group)
    }

    return groups
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

  renderGroup(group) {
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
          style={{ marginLeft, marginBottom, width, height }}
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

    return (
      <View
        onLayout={this.onLayout.bind(this)}
        style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}
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
