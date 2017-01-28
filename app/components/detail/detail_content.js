import React, { PropTypes, Component } from 'react'
import { View, Text, StyleSheet, AsyncStorage } from 'react-native'
import Fcm from 'react-native-fcm'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'

import DetailRow from './detail_row'
import StackedBar from '../material/charts/stacked_bar'
import Press from '../material/buttons/press'

import { parseStatus, parseRealmData, parseQueue, generateRatioGraphData } from '../../util/parser'

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

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    AsyncStorage.getItem(`/topics/${this.props.id}`)
      .then((response) => {
        const value = response === 'true'
        this.setState({ subscribed: value })
      })
  }

  onPress() {
    if (!this.state.subscribed) {
      Fcm.subscribeToTopic(`/topics/${this.props.id}`)
      this.setState({ subscribed: true })
      AsyncStorage.setItem(`/topics/${this.props.id}`, 'true')
    } else {
      Fcm.unsubscribeFromTopic(`/topics/${this.props.id}`)
      this.setState({ subscribed: false })
      AsyncStorage.setItem(`/topics/${this.props.id}`, 'false')
    }
  }

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
        <Press onPress={this.onPress.bind(this)}>
          <View style={styles.subscribeButton}>
            <Text style={styles.subscribeText}>
              {(this.state.subscribed ? 'Unsubscribe' : 'Subscribe').toUpperCase() }
            </Text>
          </View>
        </Press>
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
  subscribeButton: {
    marginBottom: 8,
    backgroundColor: '#0070DE',
    borderRadius: 2,
    elevation: 2,
    minWidth: 88,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
    marginRight: 16
  },
  subscribeText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '500'
  }
})

function mapStateToProps({ stats }, { id }) {
  const servers = stats.data.servers || {}
  const autoqueue = stats.data.autoqueue || {}
  const realmdata = stats.data.realmdata || {}
  const service = servers[id] || {}

  return {
    ...parseStatus({ ...service, id }, autoqueue),
    ...parseRealmData(id, realmdata),
    queue: parseQueue(id, autoqueue)
  }
}

export default connect(mapStateToProps)(DetailContent)
