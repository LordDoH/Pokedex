import AsyncStorage from '@react-native-async-storage/async-storage'

const favoriteKey = process.env.FAVORITE_STORAGE_KEY

export async function addFavoriteApi(id) {
  try {
    const favorites = await getFavoritesApi()
    if (!favorites.includes(id)) {
      favorites.push(id)
      favorites.sort((a, b) => a - b)
      await AsyncStorage.setItem(favoriteKey, JSON.stringify(favorites))
    }
  } catch (e) {
    throw e
  }
}

export async function getFavoritesApi() {
  try {
    const favorites = await AsyncStorage.getItem(favoriteKey)
    if (!favorites) {
      return []
    }
    return JSON.parse(favorites)
  } catch (e) {
    throw e
  }
}

export async function removeFavoriteApi(id) {
  try {
    const favorites = await getFavoritesApi()
    const newFavorites = favorites.filter((fav) => fav !== id)
    await AsyncStorage.setItem(favoriteKey, JSON.stringify(newFavorites))
  } catch (e) {
    throw e
  }
}

export async function isFavoriteApi(id) {
  try {
    const favorites = await getFavoritesApi()
    return favorites.includes(id)
  } catch (e) {
    throw e
  }
}

export async function clearFavoritesApi() {
  try {
    await AsyncStorage.removeItem(favoriteKey)
  } catch (e) {
    throw e
  }
}
