import { SafeAreaView, Text } from 'react-native'
import React, { useCallback, useState } from 'react'
import { getFavoritesApi } from '../api/favorite'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth'
import { getPokemonDetailsById } from '../api/pokemon'
import PokemonList from '../components/PokemonList'
import NotLogged from '../components/NotLogged'

export default function Favorite() {
  const [favorites, setFavorites] = useState([])

  const { auth } = useAuth()

  const navigation = useNavigation()

  useFocusEffect(
    useCallback(() => {
      ;(async () => {
        try {
          if (!auth) return
          const favs = await getFavoritesApi()
          const pokemonArray = []
          for (const fav of favs) {
            const response = await getPokemonDetailsById(fav)
            pokemonArray.push({
              id: response.id,
              name: response.name,
              type: response.types[0].type.name,
              order: response.order,
              image: response.sprites.versions['generation-iii']['firered-leafgreen'].front_default,
            })
          }
          setFavorites(pokemonArray)
          navigation.setParams({ fav: favs })
        } catch (e) {
          console.log(e)
        }
      })()
      return () => {
        navigation.setParams({})
      }
    }, [auth])
  )

  return <SafeAreaView>{auth ? <PokemonList pokemons={favorites} /> : <NotLogged />}</SafeAreaView>
}
