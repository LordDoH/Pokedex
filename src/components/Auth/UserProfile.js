import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { useFocusEffect } from '@react-navigation/native'
import { getFavoritesApi } from '../../api/favorite'

export default function UserProfile() {
  const { auth, logout } = useAuth()
  const [favoritesNumber, setFavoritesNumber] = useState([])

  useFocusEffect(
    useCallback(() => {
      ;(async () => {
        try {
          if (!auth) return
          const favs = await getFavoritesApi()
          setFavoritesNumber(favs.length)
        } catch (e) {
          console.log(e)
        }
      })()
      return () => {}
    }, [])
  )

  return (
    <View style={styles.content}>
      <View style={styles.titleBlock}>
        <Text style={styles.title}>Bienvenido, </Text>
        <Text style={styles.title}>{`${auth.firstName} ${auth.lastName}`} </Text>
      </View>
      <View style={styles.dataContent}>
        <ItemMenu title="Nombre" text={`${auth.firstName} ${auth.lastName}`} />
        <ItemMenu title="Usuario" text={auth.username} />
        <ItemMenu title="Email" text={auth.email} />
        <ItemMenu title="Total Favoritos" text={`${favoritesNumber} Pokémon(s)`} />
      </View>
      <View style={styles.button_container}>
        <TouchableOpacity onPress={logout} style={styles.logout_button}>
          <Text style={styles.logout_button_text}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const ItemMenu = (props) => {
  const { title, text } = props
  return (
    <View style={styles.item_menu}>
      <Text style={styles.item_menu_title}>{title}</Text>
      <Text>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  titleBlock: {
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  dataContent: {
    marginBottom: 20,
  },
  item_menu: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#cfcfcf',
  },
  item_menu_title: {
    fontWeight: 'bold',
    width: 150,
  },
  button_container: {
    alignItems: 'center',
  },
  logout_button: {
    backgroundColor: '#DC0A2D',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    width: 150,
    alignItems: 'center',
  },
  logout_button_text: {
    color: 'white',
    fontWeight: 'bold',
  },
})
