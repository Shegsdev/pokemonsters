import type { NextPage } from 'next'
import Image from 'next/image'
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

  const handleClick = () => {
    //
  }

  const { data } = pokemons

  if (!error && data) {
    return (
      <div className={styles.wrapper}>
        <nav>
          <p>pokeMonsters</p>
        </nav>

        <div className={styles.main}>
          <div className={styles.container}>
            <div className={styles.grid}>
              {
                data.map((poke: PokemonType) => (
                  <div className={styles.card} key={poke.name} onClick={handleClick}>
                    <Image src={poke.image} alt="pokemon image" width={45} height={45} />
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
      </div>
    )
  }
  return (
    <></>
  )
}

export default Pokemons
