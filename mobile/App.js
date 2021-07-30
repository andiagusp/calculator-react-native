import React, { useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons'
import { NativeBaseProvider } from 'native-base'

import Login from './src/screens/Login'
import Calculator from './src/screens/Calculator'
import PrivatePost from './src/PrivateRoute/PrivatePost'
import Logout from './src/screens/Logout'
import { UserContext, UserContextProvider } from './src/context/UserContext'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

export default () => (
  <UserContextProvider>
    <NativeBaseProvider>
      <App/>
    </NativeBaseProvider>
  </UserContextProvider>
)

function App() {
  const [state, dispatch] = useContext(UserContext)
  console.log(state)
  const isLogin = false
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={ ({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName
            if (route.name === 'Calculator') {
              iconName = "calculate"
            } else if (route.name === 'Login' || route.name === 'Home Post') {
              iconName = "post-add"
            } else if (route.name === 'Logout') {
              iconName = "logout"
            }
            return <MaterialIcons name={ iconName } size={ size } color={ color } />
          }
        }) }
      >
        {
          state.isLogin ? 
            <>
              <Tab.Screen name="Home Post" component={ PrivatePost } />
              <Tab.Screen name="Logout" component={ Logout } />
            </>
          :
          <>
            <Tab.Screen name="Calculator" component={ Calculator } />
            <Tab.Screen name="Login" component={ Login } />
          </>
        }
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
