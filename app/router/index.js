import React, { PropTypes, Component } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Scene, Router } from 'react-native-router-flux'

import fadeBottom from './animations/fade_bottom'

import App from '../components/app'
import Detail from '../components/detail'
const ConnectedRouter = connect()(Router)
import withNavbar from './with_navbar'
import Navbar from './navbar'

import { THEME } from '../config'
const { PRIMARY_COLOR } = THEME

function getSceneStyle(props, computedProps) {
  return {
    backgroundColor: PRIMARY_COLOR
  }
}

const routerProps = Platform.select({
  android: {
    hideNavBar: true,
    panHandlers: null,
    animationStyle: fadeBottom,
    duration: 250
  },
  ios: {
    navBar: Navbar,
    style: getSceneStyle(),
    getSceneStyle
  }
})

export default class AppRouter extends Component {
  render () {

    return (
      <ConnectedRouter
        {...routerProps}
      >
        <Scene key='main'>
          <Scene key='app' component={withNavbar(App)} title='Vanilla Status' initial={true} />
          <Scene key='detail' component={withNavbar(Detail)} overrideNavbar={true} />
        </Scene>
      </ConnectedRouter>
    )
  }
}

const styles = StyleSheet.create({
  sceneStyle: {
    backgroundColor: PRIMARY_COLOR
  }
})
