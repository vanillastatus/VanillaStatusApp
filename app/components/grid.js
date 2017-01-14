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

import RealmCards from './realm_cards'

import { THEME } from '../config'

import Dimensions from 'Dimensions'

const { PRIMARY_COLOR, ACCENT_COLOR } = THEME

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

  renderGroup(group) {
    const { height, width } = Dimensions.get('window')
    const currentHeight = width/group.items.length
    const currentWidth = currentHeight

    const items = group.items.map((item, index) => {
      return <Box key={item.url} style={{  marginLeft: 4, marginBottom: group.isLast ? 2 : 4, width: currentWidth, height: currentHeight }} imageURL={item.url}  />
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
          style={{ margin: 4 }}
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
  }
})

Grid.defaultProps = {
  items: [
    { url: 'https://elysium-project.org/assets/realms/1.jpg' },
    { url: 'https://elysium-project.org/assets/realms/2.jpg' },
    { url: 'https://elysium-project.org/assets/realms/3.jpg' },
    { url: 'https://elysium-project.org/assets/realms/4.jpg' },
    { url: 'https://elysium-project.org/assets/img/slide1.jpg' }
  ],
  itemsPerRow: 2
}

export default Grid
