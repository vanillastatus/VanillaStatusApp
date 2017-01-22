import React, { PropTypes, Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'

import { parseRealmData, parseQueue } from '../util/parser'

import { FACTION_COLORS } from '../config'

class DetailContent extends Component {

  renderRealmData() {
    return (
      <View style={styles.realmDataContainer}>
        <View style={styles.row}>
          <View style={styles.iconWrapper}>
            <View style={styles.icon}>
              <Icon name='people' size={36} color='#ffffff' />
            </View>
          </View>
          <Text style={styles.text}>{this.props.population}</Text>
          <Text style={styles.subtitle}>Population</Text>
        </View>
        <View style={styles.ruler} />
        <View style={styles.row}>
          <View style={styles.iconWrapper}>
            <View style={styles.icon}>
              <Icon name='linear-scale' size={36} color='#ffffff' />
            </View>
          </View>
          <Text style={styles.text}>{this.props.queue || 'None'}</Text>
        <Text style={styles.subtitle}>Queue</Text>
        </View>
        <View style={styles.ruler} />
        <View style={styles.row}>
          <View style={styles.iconWrapper}>
            <View style={styles.icon}>
              <Icon name='backup' size={36} color='#ffffff' />
            </View>
          </View>
          <Text style={styles.text}>{this.props.uptime}</Text>
          <Text style={styles.subtitle}>Uptime</Text>
        </View>
        <View style={styles.ruler} />
        <View style={styles.row}>
          <View style={styles.iconWrapper}>
            <View style={styles.icon}>
              <Icon name='equalizer' size={36} color='#ffffff' />
            </View>
          </View>
          <View style={styles.barGraph}>
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 36,
              backgroundColor: FACTION_COLORS.ALLIANCE,
              flex: Math.floor(this.props.percentage_alliance)}}
            >
              <Text style={{ color: 'white', fontSize: 16 }}>{`${Math.round(this.props.percentage_alliance).toFixed(0)}%`}</Text>
           </View>

            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 36,
              backgroundColor: FACTION_COLORS.HORDE,
              flex: Math.floor(this.props.percentage_horde)}}
            >
              <Text style={{ color: 'white', fontSize: 16 }}>{`${Math.round(this.props.percentage_horde).toFixed(0)}%`}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.iconWrapper}>
            <View style={styles.icon}>
              <Icon name='import-export' size={36} color='#ffffff' />
            </View>
          </View>
          <Text style={styles.text}>{this.props.status ? 'Online' : 'Offline'}</Text>
          <Text style={styles.subtitle}>Status</Text>
        </View>
        <View style={styles.ruler} />
        { !this.props.isService ? this.renderRealmData() : null }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    marginBottom: 24
  },
  realmDataContainer: {
    flex: 1
  },
  row: {
    height: 72,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  iconWrapper: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 72,
    height: 72
  },
  barGraph: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 72,
    paddingRight: 16,
    paddingTop: 16
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    marginLeft: 72,
    fontSize: 16,
    color: 'rgba(255, 255, 255, 1)'
  },
  subtitle: {
    marginLeft: 72,
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14
  },
  ruler: {
    marginLeft: 72,
    backgroundColor: 'rgb(159, 159, 159)',
    height: 1
  }
})

function mapStateToProps({ stats }, { id }) {
  return {
    ...parseRealmData(id, stats.data.realmdata || {}),
    queue: parseQueue(id, stats.data.autoqueue || {})
  }
}

export default connect(mapStateToProps)(DetailContent)
