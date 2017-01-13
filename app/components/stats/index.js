import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button
} from 'react-native';

import { connect } from 'react-redux'
import RealmCards from '../realm_cards'

import { THEME } from '../../config'

const { PRIMARY_COLOR, ACCENT_COLOR } = THEME

class Stats extends Component {
  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#fafafa' }}>
        <RealmCards realms={this.props.servers} autoqueue={this.props.autoqueue} />
        <View style={styles.donateContainer}>
          <View style={{ marginTop: 25 }}>
            <Button
              title='Donate'
              color={ACCENT_COLOR}
              onPress={() => { console.log('Game time!') }}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  donateContainer: {
    marginLeft: 25,
    marginBottom: 25,
    marginRight: 25,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  }
})

function mapStateToProps(state, props) {
  if (state.stats && state.stats.data) {
    const { servers, autoqueue } = state.stats.data
    return {
      servers,
      autoqueue
    }
  }
  return {}
}

export default connect(mapStateToProps)(Stats)
