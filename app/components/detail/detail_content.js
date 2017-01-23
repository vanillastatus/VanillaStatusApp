import React, { PropTypes, Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'

import DetailRow from './detail_row'

import { parseRealmData, parseQueue } from '../../util/parser'

import { FACTION_COLORS } from '../../config'

class DetailContent extends Component {

  renderRealmData() {
    return (
      <View style={styles.realmDataContainer}>
        <DetailRow
          icon='people'
          text={this.props.population || 0}
          label='Population'
        />
        <DetailRow
          icon='linear-scale'
          text={this.props.queue || 'None'}
          label='Queue'
        />
        <DetailRow
          icon='backup'
          text={this.props.uptime || 'Unavailable '}
          label='Uptime'
        />
        <View style={styles.row}>
          <View style={styles.iconWrapper}>
            <View style={styles.icon}>
              <Icon name='equalizer' size={36} color='#ffffff' />
            </View>
          </View>
          <View style={styles.barGraph}>
            <View style={[ styles.bar, {
                backgroundColor: FACTION_COLORS.ALLIANCE,
                flex: Math.floor(this.props.percentage_alliance)
              } ]}
            >
              <Text style={{ color: 'white', fontSize: 16 }}>{`${Math.round(this.props.percentage_alliance).toFixed(0)}%`}</Text>
            </View>
            <View style={[ styles.bar, {
                backgroundColor: FACTION_COLORS.HORDE,
                flex: Math.floor(this.props.percentage_horde)
              } ]}
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
        <DetailRow
          icon='import-export'
          text={this.props.status ? 'Online' : 'Offline'}
          label='Status'
        />
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
  bar: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 36
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

function mapStateToProps({ stats }, { id }) {
  return {
    ...parseRealmData(id, stats.data.realmdata || {}),
    queue: parseQueue(id, stats.data.autoqueue || {})
  }
}

export default connect(mapStateToProps)(DetailContent)
