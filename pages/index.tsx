import type { NextPage } from 'next'
import Head from 'next/head'
import Pokemons from './pokemons/Pokemons'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>PokeMonsters</title>
        <meta name="description" content="Pocket Monsters" />
      </Head>

      <main>
        <Pokemons />
      </main>

      <footer>
        <p style={{ textAlign: 'center', fontSize: '12px' }}>Made with ❤ by Shegsdev</p>
      </footer>
    </div>
  )
}

export default Home
