import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import Fcm, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm'

import { Actions as RouterActions } from 'react-native-router-flux'

import Main from './app/components/main'

function handleNotification(notification) {
  if (notification.opened_from_tray) {
    // app was open/resumed because user pressed banner
    if (notification.realm) {
      let { realm } = notification
      // Gotta parse nested data that gets stringified
      realm = typeof realm === 'string' ? JSON.parse(realm) : realm
      RouterActions.detail(realm)
    }
  }

  switch(notification._notificationType) {
    case NotificationType.Remote:
      // other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
      notification.finish(RemoteNotificationResult.NewData)
      break
    case NotificationType.NotificationResponse:
      notification.finish()
      break
    case NotificationType.WillPresent:
      //other types available: WillPresentNotificationResult.None
      notification.finish(WillPresentNotificationResult.All)
      break
  }
}

function handleToken(token) {
  // token on launch
}

function updateToken(token) {
  // token was updated (ios blagh)
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

AppRegistry.registerComponent('ElysiumStatus', () => ElysiumStatus);
