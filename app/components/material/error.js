import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  ListView,
  Image,
  Platform
} from 'react-native';

import _ from 'lodash'
import { Actions as RouterActions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { THEME } from '../../config'

const { PRIMARY_COLOR, BACKGROUND_COLOR, ACCENT_COLOR, ERROR_COLOR } = THEME

function HelpfulMessage({ label, content }) {
  if (!label) {
    return null
  }

  return (
    <View>
      <Text style={{ color: '#fff', fontWeight: '600' }}>{label}</Text>
      <Text style={{ color: '#fff' }}>{content}</Text>
    </View>
  )
}


class Error extends Component {

  constructor(props) {
    super(props)
  }

  isThereHelpfulInformation() {
    const { error } = this.props
    return _.has(error, 'status') || _.has(error, 'data.message')
  }

  renderHelpfulErrorInformation() {
    if (!this.isThereHelpfulInformation()) {
      return null
    }

    const status = _.get(this.props.error, 'status')
    const message = _.get(this.props.error, 'data.message')

    return (
      <View style={{ padding: 24 }}>
        <Text style={{ color: '#fff', fontSize: 14 }}>Maybe helpful error information below</Text>
        <HelpfulMessage label='Status' content={status} />
        <HelpfulMessage label='Message' content={message} />
      </View>
    )
  }

  render() {
    console.log(this.props.error)
    return (
      <View style={{
          flex: 1,
          backgroundColor: BACKGROUND_COLOR,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Icon name='cloud-off' size={128} color={ACCENT_COLOR} />
        <View style={{ padding: 24 }}>
          <Text style={{ color: 'hsla(0, 0%, 100%, 0.9)', fontSize: 32, fontWeight: '600', marginBottom: 24 }}>Elysium Status' servers must be down</Text>
          <Text style={{ color: 'hsla(0, 0%, 100%, 0.9)', fontSize: 32, fontWeight: '600' }}>I'm sorry :(</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})

Error.defaultProps = {}

export default Error
