import { POKEMON_TYPE_COLORS } from './constants'

const getTypeColor = (type) => POKEMON_TYPE_COLORS[type.toLowerCase()]

export default getTypeColor
