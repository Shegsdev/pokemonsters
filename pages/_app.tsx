import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'

import styles from '../styles/Layout.module.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>PokeMonsters</title>
        <meta name="description" content="Pocket Monsters" />
      </Head>

      <nav className={styles.navbar}>
        <p>pokeMonsters</p>
      </nav>
      <main className={styles.wrapper}>
        <Component {...pageProps} />
      </main>
      <footer>
        <p style={{ textAlign: 'center', fontSize: '12px' }}>
          Made with ❤ by <Link href="https://github.com/Shegsdev">Shegsdev</Link>
        </p>
      </footer>
    </>
  )
}

export default MyApp
