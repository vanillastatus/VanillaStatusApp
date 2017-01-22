import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Scene, Router } from 'react-native-router-flux'

import fadeBottom from './animations/fade_bottom'

import App from '../components/app'
import Detail from '../components/detail'
const ConnectedRouter = connect()(Router)
import withNavbar from './with_navbar'

export default class AppRouter extends Component {
  render () {

    return (
      <ConnectedRouter
        hideNavBar={true}
        panHandlers={null}
        animationStyle={fadeBottom}
      >
        <Scene key='main'>
          <Scene key='app' component={withNavbar(App)} title='Elysium Status' initial={true} />
          <Scene key='detail' component={withNavbar(Detail)} />
        </Scene>
      </ConnectedRouter>
    )
  }
}
