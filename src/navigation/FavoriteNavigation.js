import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Pokemon from '../screens/Pokemon'
import Favorite from '../screens/Favorite'

const Stack = createNativeStackNavigator()

export default function FavoriteNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favorite"
        component={Favorite}
        options={{
          title: 'Favoritos',
          headerTitleAlign: 'center',
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
