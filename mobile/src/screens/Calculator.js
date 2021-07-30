import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants'

import Header from '../components/Header'
import CalculatorScreen from '../components/CalculatorScreen'


const Calculator = () => {
  return (
    <View style={ styles.container }>
      <Header title={ 'Calculator App' } />
      <CalculatorScreen />
    </View>
  )
}

export default Calculator

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFA0A0',
    display: 'flex',
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10
  }
})