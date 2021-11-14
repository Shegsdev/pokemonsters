import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { API } from '../api/pokemon'
import styles from '../../styles/PokemonDetails.module.css'
import { PokemonType } from '../../interfaces/pokemon.interface'

const PokemonDetails: NextPage<{pokemon: PokemonType, error: Boolean}> = ({ pokemon, error }) => {

  const renderBadges = (items: any) => (
    items?.map(({ name, url } : { name: string, url: string }) => (
      <a href={url} key={name} className={styles.badge}>{name}</a>                        
    ))
  )  

  if (error) return (<div className={styles.main}><p>Problem loading page. Try again.</p></div>)
  const { name, species, weight, types, stats, moves, sprite } = pokemon
  return (
    <div className={styles.main}>
        <div className={styles.container}>
          {
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2>{name}</h2>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.details}>
                  <p>Specie: <strong>{species.toUpperCase()}</strong></p>
                  <p>Weight: <strong>{weight}</strong></p>
                  <p>Types:
                    {" "}
                    {
                      renderBadges(types)
                    }
                  </p>
                  <p>Stats:
                    {" "}
                    {
                      renderBadges(stats)
                    }
                  </p>
                  <div className={styles.moves}>Moves:
                    {" "}
                    {
                      renderBadges(moves)
                    }
                  </div>
                  <small>
                    <Link href="/">&lt; Go back to all pokemons</Link>
                  </small>
                </div>
                <div className={styles.sprite}>
                  <Image src={sprite} alt="pokemon image" layout='fill' unoptimized />
                </div>
              </div>
            </div>
          }
        </div>
      </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query: { name } } = context
  const result = await API.getPokemon(String(name))
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

export default PokemonDetails
