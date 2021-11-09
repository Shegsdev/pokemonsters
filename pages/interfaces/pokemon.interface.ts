interface ResultType {
  name: string,
  url: string,
}
export interface PokemonArrayType {
  count: number,
  next?: string,
  previous?: any,
  results: ResultType,
}

export interface PokemonType {
  species: string,
  stats: ResultType,
  types: ResultType,
  weight: number,
  moves: ResultType,
  name: string,
  image: string,
}
