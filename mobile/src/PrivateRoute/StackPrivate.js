import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import Post from '../screens/Post'
import PostCreate from '../screens/PostCreate'
import PostDetail from '../screens/PostDetail'

const Stack = createStackNavigator()

const StackPrivate = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Post" component={ Post }  />
      <Stack.Screen name="Post Create" component={ PostCreate }  />
      <Stack.Screen name="Post Detail" component={ PostDetail }  />
    </Stack.Navigator>
  )
}

export default StackPrivate
