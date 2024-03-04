import React, { useState, createContext } from 'react'
import { clearFavoritesApi } from '../api/favorite'

export const AuthContext = createContext({
  auth: null,
  login: () => {},
  logout: () => {},
})

export const AuthProvider = (props) => {
  const { children } = props
  const [auth, setAuth] = useState(null)

  const login = (userData) => {
    setAuth(userData)
  }

  const logout = async () => {
    setAuth(null)
    // await clearFavoritesApi()
  }

  const valueContext = {
    auth,
    login,
    logout,
  }

  return <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
}
