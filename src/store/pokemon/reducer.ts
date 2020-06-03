import { createReducer } from '@reduxjs/toolkit';
import { PokemonState } from './types';
import { loadPokemonListSuccess, loadPokemonListPending } from './actions';

const initialState: PokemonState = {
  currentOffset: 0,
  currentLimit: 0,
  pokemon: undefined,
  pokemonDetails: [],
  loading: false,
};

export const pokemonReducer = createReducer(initialState, {
  [loadPokemonListPending.type]: (state) => {
    state.loading = true;
  },
  [loadPokemonListSuccess.type]: (state, action) => {
    state.pokemon = action.payload;
    state.loading = false;
  },
});
