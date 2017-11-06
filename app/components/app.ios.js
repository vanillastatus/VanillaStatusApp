import React, { Component } from 'react'
import {
  Platform,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  ScrollView,
  ActivityIndicator
} from 'react-native'

import _ from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'
import { parseStatus } from '../util/parser'


import Grid from './grid'
import Error from './material/error'

import { statsPoll } from '../modules/stats'

import { THEME } from '../config'

const TITLE = 'Vanilla Status'
const { PRIMARY_COLOR, BACKGROUND_COLOR, ACCENT_COLOR } = THEME

class App extends Component {
  constructor(props) {
    super(props)
  }

  renderActivityIndicator() {
    const size = Platform.OS === 'ios' ? 1 : 100
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: BACKGROUND_COLOR }}>
        <ActivityIndicator size={size} color={ACCENT_COLOR} style={{ height: 100 }} />
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

    if (this.props.error) {
      return <Error error={this.props.error} />
    }

    return (
      <View style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}>
        { this.props.hasFetched ? this.renderStats(servers, autoqueue) : this.renderActivityIndicator() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: PRIMARY_COLOR,
    height: 76, shadowColor: "#000000",
    shadowOpacity: 0.18,
    shadowRadius: 2.5,
    shadowOffset: { height: 2.8 },
    zIndex: 4
  },
  appbarText: {
    flex: 1,
    bottom: 0,
    justifyContent: 'flex-end'
  },
  title: {
    marginTop: 20,
    marginLeft: 16,
    fontSize: 20,
    color: 'hsl(0, 0%, 100%)'
  },
  subtitle: {
    marginLeft: 16,
    fontSize: 14,
    marginBottom: 6,
    marginTop: 2,
    color: 'hsla(0, 0%, 100%, 0.75)'
  }
});

function mapStateToProps(state, props) {
  return {
    ...state.stats
  }
}

export default connect(mapStateToProps)(App)
