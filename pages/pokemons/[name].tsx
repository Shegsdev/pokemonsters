import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { API } from '../api/pokemon'
import styles from '../../styles/PokemonDetails.module.css'

const PokemonDetails: NextPage = () => {
  const { query: { name } } = useRouter()
  const [pokemon, setPokemon] = useState({})
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {    
    setLoading(true)
    const fetchData = async () => {
      const data = await API.getPokemon(name)
      if (data) setPokemon({ ...data })
      else setError(true)
      return null
    }
    fetchData()
    return setLoading(false)
  }, [name])

  const renderBadges = (items: any) => (
    items?.map(({ name, url } : { name: string, url: string }) => (
      <a href={url} key={name} className={styles.badge}>{name}</a>                        
    ))
  )

  const { name: name_, species, weight, types, stats, moves, sprite } = pokemon
  

  if (error) return (<div className={styles.main}><p>Problem loading page. Try again.</p></div>)
  if (!loading && name_) {
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
                    <Image src={sprite} alt="pokemon image" layout='fill' />
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
    )
  }
  return (
    <div className={styles.main}>
      <p>Loading...</p>
    </div>
  )
}

export const getServerSideProps = (context: {}) => {
  return {
    props: {}
  }
}

export default PokemonDetails
