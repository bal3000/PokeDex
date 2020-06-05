import { PokemonList } from '../../models/pokemon-list.interface';
import { PokemonDictonary } from '../../models/pokemon-dictonary.interface';

export interface PokemonState {
  currentOffset: number;
  currentLimit: number;
  pokemon?: PokemonList;
  pokemonDetails: PokemonDictonary;
  loading: boolean;
}

export const GET_POKEMON_LIST = 'GET_POKEMON_LIST';
export const GET_POKEMON = 'GET_POKEMON';
