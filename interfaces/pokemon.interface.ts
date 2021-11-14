export interface PokemonType {
  species: string,
  stats: Species[];
  types: Type[];
  weight: number,
  moves: Move[],
  name: string,
  sprite: string,
}
export interface SyntheticEvent<T> {
  selected: number
}
export interface PokemonResults {
  count:    number;
  next:     string;
  previous: null;
  results:  Result[];
}
export interface Result {
  name: string;
  url:  string;
}
interface Species {
  name: string;
  url:  string;
}
interface Move {
  move:                  Species;
  version_group_details: VersionGroupDetail[];
}
interface VersionGroupDetail {
  level_learned_at:  number;
  move_learn_method: Species;
  version_group:     Species;
}
interface Stat {
  base_stat: number;
  effort:    number;
  stat:      Species;
}

interface Type {
  slot: number;
  type: Species;
}
