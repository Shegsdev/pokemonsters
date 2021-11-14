import type { GetServerSideProps, NextPage } from 'next'
import Pokemons from './pokemons/Pokemons'
import { API } from './api/pokemon'
import { PokemonType } from '../interfaces/pokemon.interface'

const Home: NextPage<{pokemons: PokemonType[], error: Boolean}> = ({ pokemons, error }) => {
  return (
    <>
      <Pokemons pokemons={pokemons} error={error} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const result = await API.getPokemons()
  if (result instanceof Error) return {
    props: {
      error: true
    }
  }
  return {
    props: {
      pokemons: result
    }
  }
}
export default Home
