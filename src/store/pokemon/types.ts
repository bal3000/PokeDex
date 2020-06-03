import { PokemonList } from '../../models/pokemon-list.interface';
import { Pokemon } from '../../models/pokemon.interface';

export interface PokemonState {
  currentOffset: number;
  currentLimit: number;
  pokemon?: PokemonList;
  pokemonDetails: Pokemon[];
  loading: boolean;
}

export const GET_POKEMON_LIST = 'GET_POKEMON_LIST';
