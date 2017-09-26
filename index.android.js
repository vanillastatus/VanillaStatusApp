import React, { Component } from 'react'
import {  AppRegistry } from 'react-native'
import Fcm, { FCMEvent } from 'react-native-fcm'
import { Actions as RouterActions } from 'react-native-router-flux'
import Main from './app/components/main'

function handleNotification(notification) {
  if (notification.local_notification) {
    console.log('LOCAL NOTIFICATION', notification)
  }

  if (notification.opened_from_tray) {
    // app was open/resumed because user pressed banner
    console.log('NOTIFICATION', notification)
    if (notification.realm) {
      RouterActions.detail(notification.realm)
    }
  }
}

function handleToken(token) {
  console.log('HANDLE_TOKEN', token)
}

function updateToken(token) {
  console.log('UPDATE_TOKEN', token)
}

export default class ElysiumStatus extends Component {

  componentDidMount() {
    Fcm.getFCMToken()
      .then(handleToken)

    Fcm.getInitialNotification()
      .then(handleNotification)
      .catch(e => {
        console.log('InitialNotification Failure')
      })
      
    this.notificationListener = Fcm.on(FCMEvent.Notification, handleNotification)
    this.refreshTokenListener = Fcm.on(FCMEvent.RefreshToken, updateToken)
  }

  componentWillUnmount() {
    this.notificationListener.remove()
    this.refreshTokenListener.remove()
  }

  render() {
    return <Main />
  }
}

AppRegistry.registerComponent('ElysiumStatus', () => ElysiumStatus)
