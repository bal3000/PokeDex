import { Pokemon } from '../../models/pokemon.interface';
import { Type } from '../../models/type.interface';

export interface PokemonState {
  searchText: string;
  pokemon: Pokemon[];
  selectedPokemon?: Pokemon;
  loading: boolean;
  types: Type[];
}

export const GET_POKEMON_LIST = 'GET_POKEMON_LIST';
export const GET_POKEMON = 'GET_POKEMON';
export const SEARCH_POKEMON = 'SEARCH_POKEMON';
export const GET_TYPES = 'GET_TYPES';
