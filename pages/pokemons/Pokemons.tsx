import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { API } from '../api/pokemon'

const Pokemons: NextPage = (props) => {
  const [pokemons, setPokemons] = useState({})
  const [error, setError] = useState(false)

  useEffect(() => {
    API.getPokemons()
       .then(({ results }) => {
        setPokemons((prevState) => ({ ...prevState, data: results }))
       })
       .catch((error) => {
         setError(true)
       })
    return () => {}
  }, [])

  return (
    <div>
      <p></p>
    </div>
  )
}

export default Pokemons
