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
  params: '/?limit=100'
}


export const API = {
  getPokemons: (): Promise<PokemonArrayType> => requests.get(`pokemon${requests.params}`),
  getPokemon: (name: string): Promise<PokemonType> => {
    return requests.get(`pokemon/${name}`)
              .then((response) => ({
                species: response.species.name,
                stats: response.stats.map(({ name, url }: { name: string, url: string }) => ({ name, url })),
                types: response.types.map(({ name, url }: { name: string, url: string }) => ({ name, url })),
                weight: response.weight,
                moves: response.moves.map(({ move: { name, url }}: { move: any, name: string, url: string }) => ({ name, url })),
                name: response.name,
                image: response.sprites.front_default,
              }))
  }
}
