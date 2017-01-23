import React, { PropTypes, Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

class DetailRow extends Component {
  render () {
    return (
      <View>
        <View style={styles.row}>
          <View style={styles.iconWrapper}>
            <View style={styles.icon}>
              <Icon name={this.props.icon} size={36} color='#ffffff' />
            </View>
          </View>
          <Text style={styles.text}>{this.props.text}</Text>
          <Text style={styles.label}>{this.props.label}</Text>
        </View>
        <View style={styles.ruler} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    height: 72,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  iconWrapper: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 72,
    height: 72
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    marginLeft: 72,
    fontSize: 16,
    color: '#ffffff'
  },
  label: {
    marginLeft: 72,
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14
  },
  ruler: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    height: StyleSheet.hairlineWidth
  }
})

export default DetailRow
