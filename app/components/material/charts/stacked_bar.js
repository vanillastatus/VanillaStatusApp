import React, { PropTypes, Component} from 'react'
import { View, Text, StyleSheet } from 'react-native'

class StackedBar extends Component {

  renderBarSegment(value, color, label) {
    const barStyle = { backgroundColor: color, flex: Math.floor(value) }
    return (
      <View key={label + color} style={[ styles.bar, barStyle ]}>
        <Text style={styles.text}>{label}</Text>
      </View>
    )
  }

  render () {
    const bars = this.props.data.map(({ value, color, label }) => {
      return this.renderBarSegment(value, color, label)
    })

    return (
      <View style={styles.barGraph}>
        {bars}
      </View>
    )
  }
}

StackedBar.propTypes = {
  data: PropTypes.array
}

StackedBar.defaultProps = {
  data: [
    // { value: 55, color: '#eaff00'},
    // { value: 45, color: '#0008ff'}
  ]
}

const styles = StyleSheet.create({
  barGraph: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 72,
    paddingRight: 16,
    paddingTop: 16
  },
  bar: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 36
  },
  text: {
    color: 'white',
    fontSize: 16
  }
})

export default StackedBar
