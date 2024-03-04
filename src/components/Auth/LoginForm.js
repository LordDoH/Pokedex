import { StyleSheet, View, Text, TextInput, Keyboard, TouchableOpacity, Animated } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useForm } from '../../hooks/useForm'
import { userCredentials, userDetails } from '../../utils/userDB'
import useAuth from '../../hooks/useAuth'

export default function LoginForm() {
  const { user, password, onChange, resetForm } = useForm({ user: '', password: '' })

  const { login } = useAuth()

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const spinValue = useRef(new Animated.Value(0)).current
  const spin = spinValue.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-30deg', '0deg', '30deg'],
  })

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(spinValue, {
          toValue: -1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(spinValue, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start()
    return () => {
      spinValue.stopAnimation()
    }
  }, [loading])

  useEffect(() => {
    setErrors({})
  }, [user, password])

  const validateFields = () => {
    const errorStack = {}
    if (!user || !password) {
      if (!user) {
        errorStack.user = 'Ingrese un nombre de usuario válido'
      }
      if (!password) {
        errorStack.password = 'Ingrese una contraseña válida'
      }
      setErrors(errorStack)
      return false
    }
    if (typeof user !== 'string' || typeof password !== 'string') {
      if (typeof user !== 'string') {
        errorStack.user = 'Ingrese un nombre de usuario válido'
      }
      if (typeof password !== 'string') {
        errorStack.password = 'Ingrese una contraseña válida'
      }
      setErrors(errorStack)
      return false
    }
    return true
  }

  const onSubmit = () => {
    setLoading(true)
    const validation = validateFields()
    if (!validation) {
      return setLoading(false)
    }
    setTimeout(() => {
      if (user.toLowerCase() !== userCredentials.username || password !== userCredentials.password) {
        setErrors({ ...errors, auth: 'Usuario o contraseña incorrectos' })
        return setLoading(false)
      } else {
        login(userDetails)
      }
    }, 3000)
    // setLoading(false)
    Keyboard.dismiss()
    resetForm()
  }

  return (
    <View>
      <Text style={styles.title}>Iniciar sesión</Text>
      <TextInput
        placeholder="Nombre de usuario"
        style={styles.input}
        autoCapitalize="none"
        value={user}
        onChangeText={(text) => onChange('user', text)}
        editable={!loading}
      />
      {errors.user && <Text style={styles.error}>{errors.user}</Text>}
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        autoCapitalize="none"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => onChange('password', text)}
        editable={!loading}
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}
      {!loading ? (
        <TouchableOpacity style={styles.send_button} title="Ingresar" onPress={onSubmit}>
          <Text style={styles.send_button_text}>Ingresar</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.spinner_container}>
          <Animated.Image style={[styles.image, { transform: [{ rotate: spin }] }]} source={require('../../assets/pokeball.png')} />
        </View>
      )}
      {errors.auth && <Text style={styles.error}>{errors.auth}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 15,
  },
  input: {
    height: 40,
    marginHorizontal: 50,
    marginVertical: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  send_button: {
    marginHorizontal: 50,
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#DC0A2D',
    borderRadius: 10,
    borderWidth: 1,
    borderBlockColor: 'black',
  },
  send_button_text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  spinner_container: {
    marginVertical: 35,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginLeft: 60,
  },
})
