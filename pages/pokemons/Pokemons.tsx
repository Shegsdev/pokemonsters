import type { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { API } from '../api/pokemon'
import { PokemonType } from '../interfaces/pokemon.interface'
import styles from '../../styles/Pokemons.module.css'

const Pokemons: NextPage = () => {
  const initialState = {
    data: [],
  }
  const [pokemons, setPokemons] = useState(initialState)
  const [error, setError] = useState(false)
  const router = useRouter()

  const getPokemonDetails = (name: string) => {
    return API.getPokemon(name)
        .then((pokemon) => {
          setPokemons((prevState: any) => ({
            ...prevState,
            data: [...prevState.data, pokemon]
          }))
        })
        .catch((error) => {
          setError(true)
        })
  }

  useEffect(() => {
    API.getPokemons()
       .then(({ count, results }) => {
         if (Array.isArray(results)) {
           results.forEach(({ name, url }) => { getPokemonDetails(name) })
          }
        })
       .catch((error) => {
         setError(true)
       })
    return () => {}
  }, [])

  const handleClick = (path: string) => {
    router.push(path)
  }

  const { data } = pokemons

  if (!error && data) {
    return (
      <>
        <div className={styles.main}>
          <div className={styles.container}>
            <div className={styles.grid}>
              {
                data.map((poke: PokemonType) => (
                  <div className={styles.card} key={poke.name} onClick={(e) => handleClick(`/pokemons/${poke.name}`)}>
                    <Image src={poke.sprite} alt="sprite" width={45} height={45} />
                    <h6>{poke.name}</h6>
                    <div className={styles.cardDetails}>
                      <p>{poke.species}</p>
                      <p>{poke.weight}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <p>Loading...</p>
    </>
  )
}

export default Pokemons
