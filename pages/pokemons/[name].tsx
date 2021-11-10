import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { API } from '../api/pokemon'
import { PokemonType } from '../interfaces/pokemon.interface'
import styles from '../../styles/PokemonDetails.module.css'

const PokemonDetails: NextPage = () => {
  const { query: { name } } = useRouter()
  const [pokemon, setPokemon] = useState<PokemonType>({})
  const [error, setError] = useState(false)

  useEffect(() => {
    API.getPokemon(name)
       .then((response) => setPokemon({ ...response }))
       .catch((error) => {
         setError(true)
       })
    return () => {}
  }, [name])

  const renderBadges = (items: any) => (
    items?.map(({ name, url } : { name: string, url: string }) => (
      <a href={url} key={name} className={styles.badge}>{name}</a>                        
    ))
  )

  if (!error) {
    return (
      <div className={styles.main}>
          <div className={styles.container}>
            {
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <h2>{pokemon.name}</h2>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.details}>
                    <p>Specie: {pokemon.species}</p>
                    <p>Weight: {pokemon.weight}</p>
                    <p>Types:
                      {" "}
                      {
                        renderBadges(pokemon.types)
                      }
                    </p>
                    <p>Stats:
                      {" "}
                      {
                        renderBadges(pokemon.stats)
                      }
                    </p>
                    <p>Moves:
                      {" "}
                      {
                        renderBadges(pokemon.moves)
                      }
                    </p>
                  </div>
                  <div className={styles.sprite}>
                    {pokemon.sprite && (<Image src={pokemon.sprite} alt="pokemon image" layout='fill' />)}
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
    )
  }
  return (
    <>
      <p>Loading...</p>
    </>
  )
}

export const getServerSideProps = (context: {}) => {
  return {
    props: {}
  }
}

export default PokemonDetails
