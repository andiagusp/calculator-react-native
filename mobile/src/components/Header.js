import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Header = ({ title }) => {
  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>{ title }</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    margin: 5
  },
  title: {
    color: 'rgba(11, 11, 11, .8)',
    fontSize: 18,
    fontWeight: '700'
  }
})
