import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  ListView,
  Image
} from 'react-native';

import Dimensions from 'Dimensions'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { THEME } from '../config'
const { PRIMARY_COLOR, ACCENT_COLOR } = THEME
const MARGIN_SIZE = 4

import Box from './material/box'

class Grid extends Component {

  groupItems(items, itemsPerRow) {
    const allGroups = []
    let group = { items: [] }
    items.forEach(function(item) {
      if (group.items.length === itemsPerRow) {
        allGroups.push(group)
        group = { items: [ item ] }
      } else {
        group.items.push(item)
      }
    })

    if (group.items.length > 0) {
      group.isLast = true
      allGroups.push(group)
    }

    return allGroups
  }

  getItemSize(group) {
    let { height, width } = Dimensions.get('window')

    // Account for margins
    width -= (group.items.length * MARGIN_SIZE)

    const currentHeight = width/group.items.length
    const currentWidth = currentHeight

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

      let icon = <Icon name='close' size={44} color='hsla(0, 100%, 41%, 0.85)' />
      if (item.status) {
        icon = <Icon name='check' size={44} color='hsla(144, 100%, 39%, 0.85)'/>
      }

      return (
        <Box
          key={item.url}
          style={{ marginLeft, marginBottom, width, height }}
          title={item.title}
          subtitle={item.subtitle}
          imageURL={item.url}
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
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return (
      <View style={{ flex: 1, backgroundColor: PRIMARY_COLOR }}>
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

Grid.defaultProps = {
  items: [
    {
      title: 'Nostalrius PVP',
      status: true,
      url: 'https://elysium-project.org/assets/realms/1.jpg'
    },
    {
      title: 'Nostalrius PVE',
      status: true,
      url: 'https://elysium-project.org/assets/realms/2.jpg'
    },
    {
      title: 'Elysium PVP',
      status: true,
      url: 'https://elysium-project.org/assets/realms/3.jpg'
    },
    {
      title: 'Zethkur PVP',
      status: false,
      url: 'https://elysium-project.org/assets/realms/4.jpg'
    },
    {
      title: 'Elysium Login Server',
      url: 'https://elysium-project.org/assets/img/slide1.jpg'
    }
  ],
  itemsPerRow: 2
}

export default Grid
