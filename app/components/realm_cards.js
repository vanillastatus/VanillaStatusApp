import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback
} from 'react-native';

import _ from 'lodash'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { THEME, SERVERS, REALMS, SOON } from '../config'

import Card from './material/card'

const { PRIMARY_COLOR, ACCENT_COLOR } = THEME

class RealmCards extends Component {

  renderRealmsDown() {
    return (
      <Card
        style={styles.card}
        title='All Realms Down'
      />
    )
  }

  getSubtitle(realm) {
    const queueData = _.find(this.props.autoqueue.servers, { name: SERVERS[realm] }) || {}
    const { queueAvailable, queue } = queueData

    if (!queueAvailable && SOON[realm]) {
      return 'Soon™'
    }

    if (queueAvailable && queue > 0) {
      return `Queue: ${queue}`
    }

    if (!queueAvailable) {
      return 'Queue Unavailable'
    }
  }

  render() {
    if (!this.props.realms) {
      return this.renderRealmsDown()
    }

    return (
      <View style={{ flex: 1}}>
        {
          Object.keys(this.props.realms).map((realm) => {
            const isRealm = REALMS[realm] || false
            const { status } = this.props.realms[realm]
            let subtitle
            if (isRealm) {
              subtitle = this.getSubtitle(realm)
            }

            let icon = <Icon name='close' size={44} color='#a81515'/>
            if (status) {
              icon = <Icon name='check' size={44} color='#13bb33'/>
            }

            return (
              <Card
                key={realm}
                style={styles.card}
                title={SERVERS[realm]}
                subtitle={subtitle}
                icon={icon}
              />
            )
         })
       }
      </View>
    )


  }
}

const styles = StyleSheet.create({
  card: {
    marginRight: 15,
    marginLeft: 15,
    marginTop: 20
  }
})

export default RealmCards
