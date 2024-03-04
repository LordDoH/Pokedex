import { StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getPokemonDetailsById } from '../api/pokemon'
import Header from '../components/Pokemon/Header'
import Type from '../components/Pokemon/Type'
import Stats from '../components/Pokemon/Stats'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Favorite from '../components/Pokemon/Favorite'
import useAuth from '../hooks/useAuth'
import { useRoute } from '@react-navigation/native'

export default function Pokemon(props) {
  const {
    navigation,
    route: {
      params: { id },
    },
  } = props

  const route = useRoute()

  const [pokemon, setPokemon] = useState(null)

  const { auth } = useAuth()

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Icon
          name="arrow-left"
          color="#fff"
          size={20}
          style={{ marginLeft: 0 }}
          onPress={() => {
            navigation.setParams({})
            navigation.goBack()
          }}
        />
      ),
    })
  }, [navigation, id, pokemon])

  useEffect(() => {
    ;(async () => {
      try {
        const response = await getPokemonDetailsById(id)
        setPokemon(response)
      } catch (e) {
        navigation.goBack()
      }
    })()
  }, [id])

  const callPokemon = async (id, direction) => {
    try {
      const dirVal = direction === 'left' ? -1 : 1

      if (route.params.fav) {
        const indexActual = route.params.fav.indexOf(id)
        if (route.params.fav[indexActual + dirVal]) {
          const response = await getPokemonDetailsById(route.params.fav[indexActual + dirVal])
          return setPokemon(response)
        } else {
          if (indexActual === 0) {
            const response = await getPokemonDetailsById(route.params.fav[route.params.fav.length - 1])
            return setPokemon(response)
          } else if (indexActual === route.params.fav.length - 1) {
            const response = await getPokemonDetailsById(route.params.fav[0])
            return setPokemon(response)
          }
        }
      }

      if (id + dirVal < 1) {
        navigation.goBack()
      } else {
        const response = await getPokemonDetailsById(id + dirVal)
        setPokemon(response)
      }
    } catch (e) {
      throw e
    }
  }

  return (
    <ScrollView>
      {pokemon && (
        <>
          {auth && <Favorite id={pokemon.id} />}
          {pokemon.id > 1 && (
            <Icon name="arrow-left" color="#fff" size={20} style={styles.left_button} onPress={() => callPokemon(parseInt(pokemon.id), 'left')} />
          )}
          <Header
            name={pokemon.name}
            id={pokemon.id}
            image={pokemon.sprites.other['official-artwork'].front_default}
            type={pokemon.types[0].type.name}
            cry={pokemon.cries.latest}
            navigation={navigation}
          />
          <Icon name="arrow-right" color="#fff" size={20} style={styles.right_button} onPress={() => callPokemon(parseInt(pokemon.id), 'right')} />
          <Type types={pokemon.types} />
          <Stats stats={pokemon.stats} />
        </>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  left_button: {
    position: 'absolute',
    top: 220,
    left: 20,
    zIndex: 2,
  },
  right_button: {
    position: 'absolute',
    top: 220,
    right: 20,
  },
})
