import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import _ from 'lodash'
import { connect } from 'react-redux'

import { getOrganizationName } from '../util/parser'

class Header extends Component {
  render() {
    return (
      <View style={{ height: 64, alignItems: 'flex-start', justifyContent: 'center', marginLeft: 16  }}>
        <Text style={{ fontSize: 24, fontWeight: '500', color: '#fff' }}>{this.props.name}</Text>
      </View>
    )
  }
}

function mapStateToProps(state, { organizationId }) {
  const organization = _.get(state, ['stats', 'data', 'organizations', organizationId])

  return {
    name: getOrganizationName(organizationId, organization)
  }
}

Header.defaultProps = {
  organization: {},
  organizationId: null
}

export default connect(mapStateToProps)(Header)
