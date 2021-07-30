import React, { createContext, useReducer } from 'react'

const UserContext = createContext()

const initial = {
  isLogin: false,
  user: {}
}

// const initial = {
//   isLogin: true,
//   user: {
//     fullname: "samsul",
//     id: 7,
//     username: "samsul"
//   }
// }


const reducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case 'login':
    case 'login_success':
      return {
        isLogin: true, 
        user: payload
      }
    case 'logout':
      return {
        isLogin: false,
        user: {}
      }
    default:
      throw new Error()
  }
}

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial)
  return (
    <UserContext.Provider value={ [state, dispatch] }>
      { children }
    </UserContext.Provider>
  )
}

export { UserContextProvider, UserContext }
