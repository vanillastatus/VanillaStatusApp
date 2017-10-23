import React, { PropTypes, Component } from 'react'
import { View, Text, StatusBar, StyleSheet } from 'react-native'
import _ from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { THEME } from '../config'
const { PRIMARY_COLOR, ACCENT_COLOR } = THEME
const NAVBAR_HEIGHT = 56

class NavBar extends Component {

  onNavigationPress() {
    if (this.props.router.stackDepth) {
      Actions.prop()
    }
  }

  render () {
    const { servers, autoqueue } = this.props.data

    if (this.props.overrideNavbar) {
      return (
        <View>
          <StatusBar translucent={true} barStyle='light-content' backgroundColor='hsla(0, 0%, 0%, 0)' />
        </View>
      )
    }

    let subtitle = 'Refreshing...'
    // Get a better value for this
    if (_.get(servers, 'lightshope_logon.lastUpdated')) {
      subtitle = `Last updated ${moment(servers.lightshope_logon.lastUpdated).fromNow()}`
    }

    if (this.props.error) {
      const retry = this.props.lastRetry ? `Last retry ${moment(this.props.lastRetry).fromNow()}` : ''
      subtitle = `${retry}`
    }

    if (this.props.isFetching) {
      subtitle = 'Refreshing...'
    }

    let navbarIcon = null
    if (this.props.router.stackDepth) {
      navbarIcon =  (
        <View style={styles.navbarIcon}>
          <Icon name='arrow-back' size={24} color={'#ffffff'} />
        </View>
      )
    }


    let navbarTextPadding = 16
    if (navbarIcon) {
      navbarTextPadding = 72
    }

    return (
      <View style={styles.navbar}>
        <StatusBar translucent={true} barStyle='light-content' backgroundColor='hsla(0, 0%, 0%, 0)' />
        {navbarIcon}
        <View style={[ styles.navbarText,  { paddingLeft: navbarTextPadding} ]}>
          <Text style={styles.title}>{this.props.router.currentScene.title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: NAVBAR_HEIGHT + 20,
    backgroundColor: PRIMARY_COLOR,
    elevation: 4,
    flexDirection: 'row'
  },
  navbarIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 16,
    marginTop: StatusBar.currentHeight/2
  },
  navbarText: {
    position: 'absolute',
    flex: 1,
    left: 0,
    bottom: 0,
    justifyContent: 'flex-end'
  },
  title: {
    fontWeight: '500',
    marginTop: 20,
    fontSize: 20,
    color: 'hsl(0, 0%, 100%)'
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 6,
    marginTop: 2,
    color: 'hsla(0, 0%, 100%, 0.75)'
  }
})

function mapStateToProps({ router, stats }) {
  return {
    router,
    ...stats
  }
}

export default connect(mapStateToProps)(NavBar)
