import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import Navigation from './src/navigation/Navigation'
import { StatusBar } from 'expo-status-bar'
import { AuthProvider } from './src/context/AuthContext'

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Navigation />
        <StatusBar style="auto" />
      </AuthProvider>
    </NavigationContainer>
  )
}
