import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import PostDetailContent from '../components/PostDetailContent'

const PostDetail = ({ route }) => {
  return (
    <View style={{ backgroundColor: '#eaeaea', flex: 1 }}>
      <PostDetailContent id={ route.params.id } />
    </View>
  )
}

export default PostDetail

const styles = StyleSheet.create({})
