import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ToolbarAndroid,
  Button,
  StatusBar,
  ScrollView,
  ProgressBarAndroid,
  ActivityIndicator
} from 'react-native'

import _ from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'
import { parseStatus } from '../util/parser'

import Grid from './grid'

import { THEME } from '../config'

const TITLE = 'Elysium Status'
const { PRIMARY_COLOR, ACCENT_COLOR } = THEME

class App extends Component {
  constructor(props) {
    super(props)
  }

  renderActivityIndicator() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: PRIMARY_COLOR }}>
        <ActivityIndicator size={100} color={ACCENT_COLOR} style={{ height: 100 }} />
      </View>
    )
  }

  renderStats(servers, autoqueue) {
    const items = Object.keys(servers).map((server) => {
      const serverWithId = { ...servers[server], id: server }
      return parseStatus(serverWithId, autoqueue)
    })

    return <Grid items={_.sortBy(items, 'order' )} />
  }

  render() {
    const { servers, autoqueue } = this.props.data

    return (
      <View style={{ flex: 1 }}>
        { this.props.hasFetched ? this.renderStats(servers, autoqueue) : this.renderActivityIndicator() }
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

function mapStateToProps(state, props) {
  return {
    ...state.stats
  }
}

export default connect(mapStateToProps)(App)
