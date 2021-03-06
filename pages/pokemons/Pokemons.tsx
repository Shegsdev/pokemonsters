import type { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { PokemonType, SyntheticEvent } from '../../interfaces/pokemon.interface'
import styles from '../../styles/Pokemons.module.css'


const Pokemons: NextPage<{pokemons: PokemonType[], error: Boolean}> = ({ pokemons, error }) => {
  const itemsPerPage = 16;
  const [currentItems, setCurrentItems] = useState<PokemonType[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const router = useRouter()

  useEffect(() => {
    if (pokemons) {
      const endOffset = itemOffset + itemsPerPage
      setPageCount(Math.ceil(pokemons.length / itemsPerPage))
      setCurrentItems(pokemons.slice(itemOffset, endOffset))
    }
  }, [itemOffset, pokemons])

  const handleCardClick = (path: string) => {
    router.push(path)
  }

  const handlePageClick = (event:SyntheticEvent<HTMLAnchorElement>) => {
    const newOffset = (event.selected * itemsPerPage) % pokemons.length;
    setItemOffset(newOffset);
  };
  

  if (error) return <div className={styles.main}><p>Problem loading page. Try again.</p></div>
  return (
    <>
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {
              currentItems.map((poke: PokemonType) => (
                <div className={styles.card} key={poke.name} onClick={(e) => handleCardClick(`/pokemons/${poke.name}`)}>
                  <Image src={poke.sprite} alt="sprite" width={45} height={45} unoptimized />
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

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  )
}

export default Pokemons
