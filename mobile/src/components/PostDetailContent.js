import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import axios from 'axios'

const PostDetailContent = ({ id }) => {
  const [detail, setDetail] = React.useState()
  const [loading, setLoading] = React.useState()
  const getDetailPost = () => {
    axios.get(`http://192.168.1.12:5000/api/post/${id}`)
    .then(res => {
      setLoading('loading....')
      setDetail(res.data.data.post)
    })
    .catch(res => console.log(err.response))
    .finally(() => setLoading())
  }

  useEffect(() => {
    getDetailPost()
  }, [])

  return (
    <ScrollView style={ styles.container }>
      { loading && <Text>{ loading }</Text>}
      <Text style={ styles.title }>{ detail?.title }</Text>
      <Text style={ styles.body }>{ detail?.post }</Text>
      <Text style={ styles.username }>{ detail?.user.username }</Text>
    </ScrollView>
  )
}

export default PostDetailContent

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20
  },
  body: {
    fontSize: 16,
    marginBottom: 20
  },
  username: {
    fontSize: 10
  }
})
