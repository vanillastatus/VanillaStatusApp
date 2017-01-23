import React, { PropTypes, Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

function MaybeText({ text }) {
  if (!text) {
    return null
  }
  return <Text style={styles.text}>{text}</Text>
}

function MaybeLabel({ label }) {
  if (!label) {
    return null
  }
  return <Text style={styles.label}>{label}</Text>
}

function MaybeChildren({ children }) {
  if (!children) {
    return null
  }
  return children
}

function MaybeDivider({ hideDivider }) {
  if (hideDivider) {
    return null
  }
  return <View style={styles.divider} />
}

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
          <MaybeText text={this.props.text} />
          <MaybeLabel label={this.props.label} />
          <MaybeChildren children={this.props.children} />
        </View>
        <MaybeDivider hideDivider={this.props.hideDivider} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1
  },
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
    marginRight: 16,
    fontSize: 16,
    color: '#ffffff'
  },
  label: {
    marginLeft: 72,
    marginRight: 16,
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14
  },
  divider: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    height: StyleSheet.hairlineWidth
  }
})

export default DetailRow
