import React, { PropTypes, Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'

import { parseRealmData } from '../util/parser'

class DetailContent extends Component {

  renderRealmData() {
    return (
      <View style={{flex: 1}}>
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
              <Icon name='backup' size={36} color='#ffffff' />
            </View>
          </View>
          <Text style={styles.text}>{this.props.uptime}</Text>
          <Text style={styles.subtitle}>Uptime</Text>
        </View>
        <View style={styles.ruler} />
        <View style={styles.row}>
          <Text style={styles.text}>{`${Math.floor(this.props.percentage_alliance).toFixed(0)}%`}</Text>
          <Text style={styles.subtitle}>Alliance</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>{`${Math.floor(this.props.percentage_horde).toFixed(0)}%`}</Text>
          <Text style={styles.subtitle}>Horde</Text>
        </View>
        <View style={styles.ruler} />
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
    backgroundColor: 'rgb(0, 0, 0)',
    height: 1
  }
})

function mapStateToProps({ stats }, { id }) {
  return {
    ...parseRealmData(id, stats.data.realmdata || {})
  }
}

export default connect(mapStateToProps)(DetailContent)
