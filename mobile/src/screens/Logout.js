import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { UserContext } from '../context/UserContext'

const Logout = () => { 
  const [state, dispatch] = React.useContext(UserContext)
  useEffect(() => {
    dispatch({
      type: 'logout',
      user: {}
    })
  }, [])
  return (
    <View>
      <Text>Logout</Text>
    </View>
  )
}

export default Logout
