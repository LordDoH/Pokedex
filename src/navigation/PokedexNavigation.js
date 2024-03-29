import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Pokemon from '../screens/Pokemon'
import Pokedex from '../screens/Pokedex'

const Stack = createNativeStackNavigator()

export default function PokedexNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pokedex"
        component={Pokedex}
        options={{
          title: '',
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Pokemon"
        component={Pokemon}
        options={{
          title: '',
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  )
}
