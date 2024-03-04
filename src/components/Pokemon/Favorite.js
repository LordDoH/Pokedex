import { Platform, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { addFavoriteApi, isFavoriteApi, removeFavoriteApi } from '../../api/favorite'

export default function Favorite(props) {
  const { id } = props

  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        const result = await isFavoriteApi(id)
        setIsFavorite(result)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [id])

  const handleFavorite = async () => {
    try {
      if (!isFavorite) {
        await addFavoriteApi(id)
        setIsFavorite(true)
      } else {
        await removeFavoriteApi(id)
        setIsFavorite(false)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return <Icon name={isFavorite ? 'heart-sharp' : 'heart-outline'} size={20} color="#f0f0f0" style={styles.favorite_icon} onPress={handleFavorite} />
}

const styles = StyleSheet.create({
  favorite_icon: {
    position: 'absolute',
    right: 25,
    top: Platform.OS === 'ios' ? 130 : 110,
    zIndex: 100,
  },
})
