import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TextArea, Stack } from 'native-base'
import Constant from 'expo-constants'
import axios from 'axios'
import { UserContext } from '../context/UserContext'

const PostCreate = () => {
  const [state, dispatch] = React.useContext(UserContext)
  const navigation = useNavigation()
  const [title, setTitle] =  React.useState()
  const [error, setError] = React.useState()
  const [post, setPost] =  React.useState()

  const onSubmit = () => {
    const body = JSON.stringify({ title, post, userid: state.user.id })
    const headers = { headers: { 'Content-Type': 'application/json' } }
    axios.post('http://192.168.1.12:5000/api/post', body, headers)
    .then(res => {
      console.log(res.data)
      if (res.data.status === 'success') {
        setTitle()
        setPost()
        navigation.navigate('Post', { id: res.data.data.post.id })
      }
    })
    .catch(err => {
      setError(err?.response?.data?.message)
      setTimeout(() => setError() ,5000)
    })
  }

  return (
    <View style={ styles.container }>
      <Text style={ styles.header }>Create Post</Text>
      {
        error && <Text style={{ fontSize: 20, marginBottom: 10 }}>{ error }</Text>
      }
      <TextInput 
        style={ styles.textInput }
        placeholder="Title"
        onChangeText={ (val) => setTitle(val) }
        value={ title }
      />
      <Stack space={4} w="90%">
        <TextArea
          style={ styles.textArea } 
          placeholder="Content Post"
          onChangeText={ (val) => setPost(val) }
          value={ post }
        />
      </Stack>
      <TouchableOpacity style={ styles.buttonSubmit } onPress={ onSubmit }>
        <Text style={{ textAlign: 'center', fontSize: 20 }}>Sumbit</Text>
      </TouchableOpacity>
    </View> 
  )
}

export default PostCreate

const styles = StyleSheet.create({
  container: {
    marginTop: Constant.statusBarHeight,
    backgroundColor: '#eaeaea',
    flex: 1,
    alignItems: 'center'
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20
  },
  textInput: {
    fontSize: 18,
    width: '90%',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20
  },
  textArea: {
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 10
  },
  buttonSubmit: {
    padding: 10,
    backgroundColor: 'lightskyblue',
    width: '90%',
    borderRadius: 10
  }
})
