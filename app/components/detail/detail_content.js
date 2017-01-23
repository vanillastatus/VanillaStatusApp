import React, { PropTypes, Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'

import DetailRow from './detail_row'
import StackedBar from '../material/charts/stacked_bar'

import { parseRealmData, parseQueue, generateRatioGraphData } from '../../util/parser'

function FactionRatio({ alliance, horde }) {
  if (!alliance || !horde) {
    return <DetailRow icon='equalizer' hideDivider='true' text='Faction Ratio Unavailable'/>
  }

  return (
    <DetailRow
      icon='equalizer'
      hideDivider='true'
    >
      <StackedBar data={generateRatioGraphData(alliance, horde)} />
    </DetailRow>
  )
}

class DetailContent extends Component {

  renderRealmData() {
    const { percentage_alliance, percentage_horde } = this.props

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
        <FactionRatio alliance={percentage_alliance} horde={percentage_horde} />
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
  }
})

function mapStateToProps({ stats }, { id }) {
  return {
    ...parseRealmData(id, stats.data.realmdata || {}),
    queue: parseQueue(id, stats.data.autoqueue || {})
  }
}

export default connect(mapStateToProps)(DetailContent)
