import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const History = ({ data }) => {
  return (
    <View style={ styles.History }>
      <Text style={ styles.textResult }>
        { `${data.firstValue} ${data.operator} ${data.secondValue} = ${data.result}` }
      </Text>
    </View>
  )
}

export default History

const styles = StyleSheet.create({
  History: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: 5,
    marginBottom: 5
  },
  textResult: {
    fontSize: 20
  }
})
