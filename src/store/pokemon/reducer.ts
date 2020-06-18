import { createReducer } from '@reduxjs/toolkit';
import { PokemonState } from './types';
import {
  loadPokemonSuccess,
  searchPokemonPending,
  searchPokemonSuccess,
} from './actions';

const initialState: PokemonState = {
  pokemon: [],
  selectedPokemon: undefined,
  loading: false,
};

const actionTypeEndsInPending = (type: string): boolean => {
  return type.substring(type.length - 8) === '/pending';
};

export const pokemonReducer = createReducer(initialState, {
  [searchPokemonPending.type]: (state) => {
    state.loading = true;
  },
  [searchPokemonSuccess.type]: (state, action) => {
    state.pokemon = action.payload;
    state.loading = false;
  },
  [loadPokemonSuccess.type]: (state, action) => {
    state.selectedPokemon = action.payload;
    state.loading = false;
  },
});
