import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { UserContext } from '../context/UserContext'

const PostContent = () => {
  const navigation = useNavigation()
  const [state] = React.useContext(UserContext)
  const [loading, setLoading] = React.useState()
  const [posts, setPosts] = React.useState([])
  const [create, setCreate] = React.useState(false)

  const getPosts = () => {
    axios.get('http://192.168.1.12:5000/api/posts')
    .then(res => {
      setLoading('loading...')
      setPosts(res.data.data.posts)
    })
    .catch(err => console.log(err))
    .finally(() => setLoading())
  }

  const deleteContent = (id) => {
    axios.delete(`http://192.168.1.12:5000/api/post/${id}`)
    .then(res => {
      getPosts()
    })
    .catch(err => console.log(err))
  }
  useEffect(() => {
    getPosts()
  }, [])

  return (
    <ScrollView style={ styles.PostContent }>
      {loading && <View><Text>{ loading }</Text></View>}
      {
        posts.map((post, i) => (
          <View style={ styles.content } key={ i }>
            <Text style={ styles.textUsername }  onPress={ () => navigation.navigate('Post Detail', { id: post.id }) }>{ post.user.username }</Text>
            <View style={ styles.body }>
              <Text onPress={ () => navigation.navigate('Post Detail', { id: post.id }) }>{ post?.title }</Text>
              <Text onPress={ () => navigation.navigate('Post Detail', { id: post.id }) }>{ post?.post }</Text>
            </View>
            {
              (post.user.username === state.user.username) &&
              <MaterialIcons
                name="restore-from-trash"
                size={24} style={{ alignSelf: 'center' }}
                color="black"
                onPress={ () => deleteContent(post.id) }
              />
            }
          </View>
        ))
      }
    </ScrollView>
  )
}

export default PostContent

const styles = StyleSheet.create({
  PostContent: {
    flex: 1,
    width: '100%',
    padding: 10
  },
  content: {
    backgroundColor: '#eaeaea',
    padding: 5,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10
  },
  textUsername: {
    alignSelf: 'center',
    fontSize: 12,
    textAlign: 'center',
    flex: 1
  },
  body: {
    flex: 5
  }
})
