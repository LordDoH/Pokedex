import React from 'react'
import { StyleSheet, View, Text, Platform } from 'react-native'
import getTypeColor from '../../utils/getTypeColor'

export default function Type(props) {
  const { types } = props

  const pillBg = (type) => {
    return {
      ...styles.pill,
      backgroundColor: getTypeColor(type),
    }
  }

  return (
    <View style={styles.content}>
      {types.map((item) => {
        return (
          <View key={item.type.url} style={pillBg(item.type.name)}>
            <Text style={styles.text}>{item.type.name}</Text>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    marginTop: Platform.OS === 'android' ? 10 : 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textTransform: 'uppercase',
    color: '#f0f0f0',
    fontWeight: 'bold',
  },
  pill: {
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 20,
    marginHorizontal: 10,
  },
})
