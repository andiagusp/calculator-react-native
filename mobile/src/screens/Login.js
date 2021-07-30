import React from 'react'
import {
  StyleSheet, Text, View,
  TextInput, TouchableOpacity
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Constants from 'expo-constants'
import axios from 'axios'

import Header from '../components/Header'
import { UserContext } from '../context/UserContext'

const LoginPost = () => {
  const [state, dispatch] = React.useContext(UserContext)
  const navigation = useNavigation()
  const [error, setError] = React.useState()
  const [isShow, setShow] = React.useState(true)
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  
  const loginHandle = () => {
    const body = JSON.stringify({ username, password })
    const config = { headers: { 'Content-Type': 'application/json' } }
    
    axios.post('http://192.168.1.12:5000/api/login', body, config)
      .then((res) => {
        console.log(res.data.data.user)
        dispatch({
          type: 'login_success',
          payload: res.data.data.user
        })
        navigation.navigate('Home Post')
      })
      .catch((err) => {
        setError(err?.response.data.message)
        setTimeout(() => setError(), 5000)
      })
  }

  return (
    <View style={ styles.Login }>
      <Header title="Login User" />
      <View style={ styles.Body }>
        <Text style={{ fontSize: 20, fontWeight: '700' }}>Login Form</Text>
          { error && 
            <Text style={{ color: 'red' }}>{ error }</Text>
          }
          <TextInput
            style={ styles.textInput }
            placeholder="username"
            value={ username }
            onChangeText={ (val) => setUsername(val) }
          />
          <TextInput
            style={ styles.textInput }
            secureTextEntry={ isShow }
            placeholder="password"
            value={ password }
            onChangeText={ (val) => setPassword(val) }
          />
          <Text style={ styles.peek } onPress={ () => setShow(!isShow) }>Show Password</Text>
          <TouchableOpacity style={ styles.buttonLogin } onPress={ () => loginHandle() }>
            <Text style={ styles.textLogin }>Login</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginPost

const styles = StyleSheet.create({
  Login: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    alignItems: 'center',
    backgroundColor: '#eaeaea'
  },
  Body: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1
  },
  buttonLogin: {
    backgroundColor: 'lightskyblue',
    padding: 20,
    width: '90%',
    borderRadius: 10
  },
  textInput: {
    padding: 20,
    width: '90%',
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  textLogin: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: 'rgba(1,1,1,.5)'
  },
  peek: {
    marginBottom: 20,
    alignSelf: 'flex-start',
    marginLeft: 25
  }
})
