import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import getTypeColor from '../utils/getTypeColor'
import { useNavigation, useRoute } from '@react-navigation/native'

export default function PokemonCard(props) {
  const { pokemon } = props

  const navigation = useNavigation()
  const route = useRoute()

  const bgStyles = {
    backgroundColor: getTypeColor(pokemon.type),
    ...styles.contentBox,
  }

  const goToPokemon = () => {
    navigation.navigate('Pokemon', { id: pokemon.id, ...route.params })
  }

  return (
    <TouchableWithoutFeedback onPress={goToPokemon}>
      <View style={styles.card}>
        <View style={styles.spacing}>
          <View style={bgStyles}>
            <Text style={styles.number}>#{`${pokemon.id}`.padStart(3, '0')}</Text>
            <Text style={styles.text}>{pokemon.name}</Text>
            <Image source={{ uri: pokemon.image }} style={styles.image} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 130,
    maxWidth: '50%',
  },
  spacing: {
    flex: 1,
    padding: 5,
  },
  contentBox: {
    flex: 1,
    borderRadius: 15,
    padding: 10,
  },
  text: {
    color: '#f0f0f0',
    fontWeight: 'bold',
    fontSize: 15,
    paddingTop: 0,
    textTransform: 'capitalize',
  },
  number: {
    position: 'absolute',
    right: 10,
    top: 13,
    color: '#fff',
    fontSize: 11,
  },
  image: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 90,
    height: 90,
  },
})
