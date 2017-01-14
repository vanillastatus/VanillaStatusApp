import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button
} from 'react-native';

import RealmCards from '../realm_cards'

import { THEME } from '../../config'

const { PRIMARY_COLOR, ACCENT_COLOR } = THEME

class Stats extends Component {
  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#fafafa', zIndex: 1 }}>
        <RealmCards realms={this.props.servers} autoqueue={this.props.autoqueue} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({

})

export default Stats
