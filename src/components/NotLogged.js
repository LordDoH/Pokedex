import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function NotLogged() {
  const navigation = useNavigation()

  return (
    <View style={styles.main_container}>
      <ImageBackground source={require('../assets/pkdbg.png')} style={styles.content}>
        <Text style={styles.text}>Necesitas estar logueado para ver tus favoritos</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Account')} style={styles.button}>
          <Text style={styles.button_text}>Iniciar sesión</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  main_container: {
    height: '100%',
    marginVertical: 'auto',
  },
  content: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    paddingBottom: 50,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginLeft: 60,
    marginRight: 90,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontWeight: 'bold',
    color: '#f0f0f0',
  },
  button: {
    backgroundColor: '#DC0A2D',
    padding: 10,
    borderRadius: 10,
    marginLeft: 60,
    marginRight: 90,
    marginTop: 10,
  },
  button_text: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontWeight: 'bold',
    color: '#f0f0f0',
  },
})
