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
  getPokemon: (id: number): Promise<PokemonType> => requests.get(`pokemon/${id}`),
}
