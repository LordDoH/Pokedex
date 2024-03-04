import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text, Image, Platform, TouchableWithoutFeedback } from 'react-native'
import getTypeColor from '../../utils/getTypeColor'
import { Audio } from 'expo-av'

export default function Header(props) {
  const { name, id, image, type, cry } = props

  const [sound, setSound] = useState()

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  async function playSound() {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: cry })
      setSound(sound)
      await sound.playAsync()
    } catch (e) {
      throw e
    }
  }

  useEffect(() => {
    Platform.OS !== 'ios' && playSound()
  }, [id])

  const color = getTypeColor(type)

  const bgStyle = [{ backgroundColor: color, ...styles.bg }]

  return (
    <>
      <View style={bgStyle} />
      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.order}>#{`${id}`.padStart(3, '0')}</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => Platform.OS !== 'ios' && playSound()}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: Platform.OS === 'android' ? 360 : 380,
    position: 'absolute',
    borderBottomEndRadius: 300,
    borderBottomLeftRadius: 300,
    transform: [{ scaleX: 2 }],
  },
  content: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  name: {
    textTransform: 'capitalize',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 27,
  },
  order: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
  },
  image: {
    width: 250,
    height: 300,
    resizeMode: 'contain',
  },
})
