export async function getPokemonsApi(receivedUrl) {
  try {
    // console.log(receivedUrl)
    const url = `${process.env.API_HOST}/pokemon?limit=20&offset=0`
    const response = await fetch(receivedUrl || url)
    const result = await response.json()
    return result
  } catch (e) {
    throw e
  }
}

export async function getPokemonDetailsApi(url) {
  try {
    const response = await fetch(url)
    const result = await response.json()
    return result
  } catch (e) {
    throw e
  }
}

export async function getPokemonDetailsById(id) {
  try {
    const url = `${process.env.API_HOST}/pokemon/${id}`
    const response = await fetch(url)
    const result = await response.json()
    return result
  } catch (e) {
    throw e
  }
}
