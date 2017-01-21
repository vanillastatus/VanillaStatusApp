import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Scene, Router } from 'react-native-router-flux'

import fadeBottom from './animations/fade_bottom'

import App from '../components/app'
const ConnectedRouter = connect()(Router)

export default class AppRouter extends Component {
  render () {
    <ConnectedRouter
      hideNavBar={true}
      panHandlers={null}
      animationStyle={fadeBottom}
    >
      <Scene key='main'>
        <Scene key='grid' component={App} title='Elysium Status' initial={true} />
      </Scene>
    </ConnectedRouter>
  }
}
