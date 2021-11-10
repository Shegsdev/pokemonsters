import axios from 'axios'
import { PokemonArrayType, PokemonType } from '../interfaces/pokemon.interface'

const client = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  timeout: 12000,
})

const requests = {
  get: async (url: string) => {
    const response = await client.get(url)
    const { data } = response
    return data
  },
  params: '/?limit=50'
}


export const API = {
  getPokemons: async () => {
    try {
      const { results } = await requests.get(`pokemon${requests.params}`)
      return Promise.all(
        results.map(async ({ name } : { name: string }) => {
          const data = await API.getPokemon(name)
          return data
        })
      )
    } catch(error) {
        console.info(error)
    }
    
  },
  getPokemon: async (name: string) => {
    try {
      const response = await requests.get(`pokemon/${name}`)
      return {
        species: response.species.name,
        stats: response.stats.map(({ stat: { name, url }}: { stat: any, name: string, url: string }) => ({ name, url })),
        types: response.types.map(({ type: { name, url }}: { type: any, name: string, url: string }) => ({ name, url })),
        weight: response.weight,
        moves: response.moves.map(({ move: { name, url }}: { move: any, name: string, url: string }) => ({ name, url })),
        name: response.name,
        sprite: response.sprites.other.dream_world.front_default || response.sprites.front_default,
      }
    } catch(error) {
        console.info(error)
    }
  }
}
