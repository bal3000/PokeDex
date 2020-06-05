import { createReducer } from '@reduxjs/toolkit';
import { PokemonState } from './types';
import {
  loadPokemonListSuccess,
  loadPokemonListPending,
  loadPokemonSuccess,
} from './actions';

const initialState: PokemonState = {
  currentOffset: 0,
  currentLimit: 0,
  pokemon: undefined,
  pokemonDetails: {},
  loading: false,
};

const actionTypeEndsInPending = (type: string): boolean => {
  return type.substring(type.length - 8) === '/pending';
};

export const pokemonReducer = createReducer(initialState, {
  [loadPokemonListPending.type]: (state) => {
    state.loading = true;
  },
  [loadPokemonListSuccess.type]: (state, action) => {
    state.pokemon = action.payload;
    state.loading = false;
  },
  [loadPokemonSuccess.type]: (state, action) => {
    const id = action.payload.id;
    if (!state.pokemonDetails[id]) {
      state.pokemonDetails[id] = action.payload;
    }
  },
});
