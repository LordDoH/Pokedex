import { SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getPokemonsApi, getPokemonDetailsApi } from '../api/pokemon'
import PokemonList from '../components/PokemonList'

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([])
  const [nextUrl, setNextUrl] = useState(null)

  useEffect(() => {
    ;(async () => {
      pokemons.length === 0 && (await loadPokemons())
    })()
  }, [])

  const loadPokemons = async () => {
    try {
      const response = await getPokemonsApi(nextUrl)
      const pokemonsArray = []
      const data = await Promise.all(response.results.map((pokemon) => getPokemonDetailsApi(pokemon.url)))
      data.forEach((pokemon) => {
        pokemonsArray.push({
          id: pokemon.id,
          name: pokemon.name,
          type: pokemon.types[0].type.name,
          order: pokemon.order,
          image: pokemon.sprites.versions['generation-iii']['firered-leafgreen'].front_default,
        })
      })
      setPokemons([...pokemons, ...pokemonsArray])
      setNextUrl(response.next)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <SafeAreaView>
      <PokemonList pokemons={pokemons} loadPokemons={loadPokemons} isNext={nextUrl} />
    </SafeAreaView>
  )
}
