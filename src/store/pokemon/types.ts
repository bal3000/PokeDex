import { Pokemon } from '../../models/pokemon.interface';

export interface PokemonState {
  pokemon: Pokemon[];
  selectedPokemon?: Pokemon;
  loading: boolean;
}

export const GET_POKEMON_LIST = 'GET_POKEMON_LIST';
export const GET_POKEMON = 'GET_POKEMON';
export const SEARCH_POKEMON = 'SEARCH_POKEMON';
