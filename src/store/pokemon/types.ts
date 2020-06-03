import { PokemonList } from '../../models/pokemon-list.interface';
import { Pokemon } from '../../models/pokemon.interface';

export interface PokemonState {
  currentOffset: number;
  currentLimit: number;
  pokemon: PokemonList;
  pokemonDetails: Pokemon[];
}

export const GET_POKEMON_LIST = 'GET_POKEMON_LIST';
export const LOAD_POKEMON_LIST_SUCCESS = 'LOAD_POKEMON_LIST_SUCCESS';
export const GET_POKEMON = 'GET_POKEMON';

interface GetPokemonListAction {
  type: typeof GET_POKEMON_LIST;
  data: {
    offset: number;
    limit: number;
  };
}

interface LoadPokemonListSuccessAction {
  type: typeof LOAD_POKEMON_LIST_SUCCESS;
  payload: PokemonList;
}

export type PokemonActionTypes = LoadPokemonListSuccessAction;
