import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Account from '../screens/Account'
import { Image } from 'react-native'
import PokedexNavigation from './PokedexNavigation'
import FavoriteNavigation from './FavoriteNavigation'

const Tab = createBottomTabNavigator()

export default function Navigation() {
  return (
    <Tab.Navigator initialRouteName="PokedexMain">
      <Tab.Screen
        name="FavoriteMain"
        component={FavoriteNavigation}
        options={{
          headerShown: false,
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size }) => <Icon name="heart" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="PokedexMain"
        component={PokedexNavigation}
        options={{
          headerTitle: '',
          headerShown: false,
          headerTitleAlign: 'center',
          tabBarLabel: '',
          tabBarIcon: () => renderPokedex(),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          headerTitle: 'Mi Cuenta',
          headerTitleAlign: 'center',
          tabBarLabel: 'Mi Cuenta',
          tabBarIcon: ({ color, size }) => <Icon name="user" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  )
}

function renderPokedex() {
  return <Image source={require('../assets/pokedexw.png')} style={{ width: 93.6, height: 86.4, top: -15 }} />
}
