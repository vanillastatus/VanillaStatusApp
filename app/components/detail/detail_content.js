import React, { PropTypes, Component } from 'react'
import { View, Text, StyleSheet, AsyncStorage, Platform, ToastAndroid } from 'react-native'
import Fcm from 'react-native-fcm'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import _ from 'lodash'

import DetailRow from './detail_row'
import StackedBar from '../material/charts/stacked_bar'
import Press from '../material/buttons/press'

import { parseStatus, parseRealmData, parseQueue, generateRatioGraphData, getOrganizationName, getOrganizationId } from '../../util/parser'

const ENV = __DEV__ ? 'dev' : 'production'

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

  getTopic(id) {
    return Platform.select({
      ios: `/topics/ios.${ENV}.elysium.${id}`,
      android: `android.${ENV}.elysium.${id}`
    })
  }

  setSubscriptionState({ id }) {
    AsyncStorage.getItem(this.getTopic(id))
      .then((response) => {
        const value = response === 'true'
        this.setState({ subscribed: value })
      })
  }

  componentDidMount() {
    this.setSubscriptionState(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
      this.setSubscriptionState(nextProps)
    }
  }

  toast() {
    if (Platform.OS === 'android') {
      let title = this.props.title

      if (!this.props.title) {
        title = 'the server'
      } else if (this.props.isService) {
        title = `the ${(title).toLowerCase()}`
      }

      const message = `We'll send you notifications when ${title} comes online`
      ToastAndroid.show(message, ToastAndroid.SHORT)
    }
  }

  onPress() {
    const topic = this.getTopic(this.props.id)
    if (!this.state.subscribed) {
      Fcm.requestPermissions() // for iOS
      Fcm.subscribeToTopic(topic)
      AsyncStorage.setItem(topic, 'true')
      this.setState({ subscribed: true })
      this.toast()
    } else {
      Fcm.unsubscribeFromTopic(topic)
      AsyncStorage.setItem(topic, 'false')
      this.setState({ subscribed: false })
    }
  }

  renderUnavailableOverlay() {
    const { percentage_alliance, percentage_horde, population, uptime } = this.props

    if (!percentage_alliance && !percentage_horde && !population && !uptime) {
      return (
        <View style={{
          height: 72 * 3,
          backgroundColor: 'rgba(0, 0, 0, 0.91)',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={{
              alignItems: 'center',
              fontSize: 16,
              fontStyle: 'italic',
              color: '#ffffff'
            }}
          >
            Realm Data Unavailable
          </Text>
        </View>
      )
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
        {/* // Commenting out queue since no longer have access to queue data
            // Maybe return in the future
          <DetailRow
            icon='linear-scale'
            text={this.props.queue || 'None'}
            label='Queue'
          />
        */}
        <DetailRow
          icon='backup'
          text={this.props.uptime || 'Unavailable '}
          label='Uptime'
        />
        <FactionRatio alliance={percentage_alliance} horde={percentage_horde} />
        {this.renderUnavailableOverlay()}
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <Press onPress={this.onPress.bind(this)}>
          <View style={styles.subscribeButton}>
            <Text style={styles.subscribeText}>
              {(this.state.subscribed ? 'Unsubscribe' : 'Subscribe (BETA)').toUpperCase() }
            </Text>
          </View>
        </Press>
        <DetailRow
          icon='import-export'
          text={this.props.status ? 'Online' : 'Offline'}
          label='Status'
        />
        <DetailRow
          icon='account-balance'
          text={this.props.organization || 'Unavailable'}
          label='Organization'
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
  const server = _.get(stats, ['data', 'servers', id])
  const organizationId = getOrganizationId(id, server)
  const organization = getOrganizationName(organizationId, _.get(stats, ['data', 'organizations', organizationId]))

  return {
    ...parseStatus({ ...server, id }, autoqueue),
    ...parseRealmData(id, realmdata),
    queue: parseQueue(id, autoqueue),
    organization
  }
}

export default connect(mapStateToProps)(DetailContent)
