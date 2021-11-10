import type { NextPage } from 'next'
import Pokemons from './pokemons/Pokemons'
import { API } from './api/pokemon'

const Home: NextPage = ({ pokemons }) => {
  return (
    <>
      <Pokemons pokemons={pokemons} />
    </>
  )
}

export const getServerSideProps = async () => {
  const data = await API.getPokemons()
  if (!data) return {
    props: {
      notFound: false
    }
  }
  return {
    props: {
      pokemons: data
    }
  }
}
export default Home
