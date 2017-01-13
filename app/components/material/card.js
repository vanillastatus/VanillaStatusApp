import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

class Card extends Component {

  renderChildren(children) {
    if (!children) {
      return <View style={styles.emptyChildren} />
    }

    return children
  }

  displayIcon() {
    if (this.props.icon) {
      return (
        <View style={{ height: 44, width: 44, marginRight: 16 }}>
          {this.props.icon}
        </View>
      )
    }
  }

  render() {
    const { style, children } = this.props

    return (
      <View style={styles.container}>
        <View
          style={[ styles.card, style ]}
        >
          <View style={{ flex: 1}}>
            <View style={styles.textWrapper}>
              { this.displayIcon() }
              <View style={{ flexDirection: 'column'}}>
                <Text style={styles.title}>
                  {this.props.title}
                </Text>
                <Text style={styles.subtitle}>
                  {this.props.subtitle}
                </Text>
              </View>
            </View>
          </View>
          {this.renderChildren(children)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    elevation: 2,
    borderRadius: 2,
    alignSelf: 'stretch',
    backgroundColor: '#ffffff'
  },
  textWrapper: {
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
    flexDirection: 'row'
  },
  title: {
    fontSize: 24,
    color: 'rgba(0, 0, 0, 0.87)'
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.54)'
  },
  emptyChildren: {
    marginBottom: 16
  }
})

Card.defaultProps = {
  style: {}
}

export default Card
