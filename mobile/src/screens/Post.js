import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Header from '../components/Header'
import PostContent from '../components/PostContent'

const Post = ({ route }) => {
  if (route.params?.id) console.log(route)
  return (
    <View style={ styles.Post }>
      <Header title="Post Beranda"/>
      <PostContent />
    </View>
  )
}

export default Post

const styles = StyleSheet.create({
  Post: {
    flex: 1,
    alignItems: 'center'
  }
})
