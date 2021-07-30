import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import Logout from '../screens/Logout'
import StackPrivate from './StackPrivate'
import PostCreate from '../screens/PostCreate'


const Drawer = createDrawerNavigator()

const PrivatePost = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Post" component={ StackPrivate } />
      <Drawer.Screen name="Post Create" component={ PostCreate }  />
      <Drawer.Screen name="Logout" component={ Logout } />
    </Drawer.Navigator>
  )
}

export default PrivatePost
