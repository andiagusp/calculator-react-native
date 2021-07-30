import React, { useEffect, useRef } from 'react'
import {
  StyleSheet, Text, View, ScrollView,
  TextInput, TouchableOpacity, FlatList,
  SafeAreaView
} from 'react-native'

import History from './History'

const CalculatorScreen = () => {
  let refToBottom = useRef()
  const [currentValue, setCurrentValue] = React.useState('')
  const [operator, setOperator] = React.useState('')
  const [firstValue, setFirstValue] = React.useState('')
  const [history, setHistory] = React.useState([])

  const onPress = (value) => {
    setCurrentValue(currentValue + value)
  }

  const onOperate = (value) => {
    if (operator) {
      setOperator(value)
      setFirstValue(firstValue)
    } else {
      setOperator(value)
      setFirstValue(currentValue)
      setCurrentValue('')
    }
  }

  const onEqual = () => {
    let result

    switch (operator) {
      case '+':
        result = parseInt(firstValue) + parseInt(currentValue)
        setHistory([...history, { firstValue, operator, secondValue: currentValue, result}])
        setCurrentValue(result.toString())
        break
      case '-':
        result = parseInt(firstValue) - parseInt(currentValue)
        setHistory([...history, { firstValue, operator, secondValue: currentValue, result}])
        setCurrentValue(result.toString())
        break
      case 'X':
        result = parseInt(firstValue) * parseInt(currentValue)
        setHistory([...history, { firstValue, operator, secondValue: currentValue, result}])
        setCurrentValue(result.toString())
        break
      case '/':
        result = parseInt(firstValue) / parseInt(currentValue)
        setHistory([...history, { firstValue, operator, secondValue: currentValue, result}])
        setCurrentValue(result.toString())
        break
      default:
        setCurrentValue('')
        break
    }
    setOperator('')
  }

  const onClear = () => {
    setCurrentValue('')
    setOperator('')
  }

  const onClearHistory = () => {
    setHistory([])
  }

  const toBottom = () => {
    refToBottom.current.scrollToEnd({ animated: true })
  }

  return (
    <View style={ styles.CalculatorScreen }>
      <SafeAreaView style={ styles.screenHistory }>
        <FlatList
          data={ history }
          keyExtractor={ (history, index) => index.toString() }
          renderItem={ ({item}) => <History data={ item } /> }
        />
        { (history.length > 0) &&
          <TouchableOpacity style={ styles.clearHistory } onPress={ onClearHistory }>
            <Text style={ styles.textClearHistory }>
              Clear History
            </Text>
          </TouchableOpacity>
        }
      </SafeAreaView>
      <TextInput
        style={ styles.textInput }
        value={ currentValue }
        editable={ false }
      />
      <View style={ styles.containerButton }>
        <View style={ styles.containerButtonRow }>
          <TouchableOpacity style={ styles.buttonNumber } onPress={ () => onPress('7') }>
            <Text style={ styles.textButton }>
              7
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={ styles.buttonNumber } onPress={ () => onPress('8') }>
            <Text style={ styles.textButton }>
              8
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={ styles.buttonNumber } onPress={ () => onPress('9') }>
            <Text style={ styles.textButton }>
              9
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.buttonNumber, ...styles.buttonOperator }} onPress={ () => onOperate('/') }>
            <Text style={ styles.textButton }>
              /
            </Text>
          </TouchableOpacity>
        </View>
        <View style={ styles.containerButtonRow }>
          <TouchableOpacity style={ styles.buttonNumber } onPress={ () => onPress('4') }>
            <Text style={ styles.textButton }>
              4
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={ styles.buttonNumber } onPress={ () => onPress('5') }>
            <Text style={ styles.textButton }>
              5
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={ styles.buttonNumber } onPress={ () => onPress('6') }>
            <Text style={ styles.textButton }>
              6
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.buttonNumber, ...styles.buttonOperator }} onPress={ () => onOperate('X') }>
            <Text style={ styles.textButton }>
              X
            </Text>
          </TouchableOpacity>
        </View>
        <View style={ styles.containerButtonRow }>
          <TouchableOpacity style={ styles.buttonNumber } onPress={ () => onPress('1') }>
            <Text style={ styles.textButton }>
              1
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={ styles.buttonNumber } onPress={ () => onPress('2') }>
            <Text style={ styles.textButton }>
              2
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={ styles.buttonNumber } onPress={ () => onPress('3') }>
            <Text style={ styles.textButton }>
              3
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.buttonNumber, ...styles.buttonOperator }} onPress={ () => onOperate('-') }>
            <Text style={ styles.textButton }>
              -
            </Text>
          </TouchableOpacity>
        </View>
        <View style={ styles.containerButtonRow }>
          <TouchableOpacity style={ styles.buttonNumber } onPress={ () => onPress('0') }>
            <Text style={ styles.textButton }>
              0
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.buttonNumber, ...styles.buttonOperator }} onPress={ onClear }>
            <Text style={ styles.textButton }>
              C
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.buttonNumber, ...styles.buttonOperator }} onPress={ onEqual }>
            <Text style={ styles.textButton }>
              =
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.buttonNumber, ...styles.buttonOperator }} onPress={ () => onOperate('+') }>
            <Text style={ styles.textButton }>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

export default CalculatorScreen

const styles = StyleSheet.create({
  CalculatorScreen: {
    flex: 2,
    width: '90%'
  },
  screenHistory: {
    flex: 1,
    paddingTop: 5
  },
  textInput: {
    padding: 10,
    backgroundColor: '#fff',
    color: 'black',
    textAlign: 'right',
    borderRadius: 10,
    fontSize: 20,
    fontWeight: '600'
  },
  textButton: {
    textAlign: 'center',
    fontSize: 50,
    color: 'white'
  },
  containerButton: {
    justifyContent: 'space-between'
  },
  containerButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  buttonNumber: {
    justifyContent: 'center',
    backgroundColor: '#FF5757',
    borderRadius: 10,
    padding: 10,
    width: 80,
    height: 80
  },
  buttonOperator: {
    backgroundColor: '#930707'
  },
  clearHistory: {
    padding: 10,
    backgroundColor: '#B5CDA3',
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10
  },
  textClearHistory: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
  }
})
