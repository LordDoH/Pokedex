import { View } from 'react-native'
import React from 'react'
import LoginForm from '../components/Auth/LoginForm'
import UserProfile from '../components/Auth/UserProfile'
import useAuth from '../hooks/useAuth'

export default function Account() {
  const { auth } = useAuth()

  return <View>{auth ? <UserProfile /> : <LoginForm />}</View>
}
