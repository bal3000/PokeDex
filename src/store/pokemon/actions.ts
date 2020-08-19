import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { Canceler } from 'axios';

import { GET_POKEMON, SEARCH_POKEMON } from './types';
import { Pokemon } from '../../models/pokemon.interface';

const pokemonUrl = 'http://localhost:3000';
let cancel: Canceler;

export const searchPokemonPending = createAction<Pokemon[]>(
  `${SEARCH_POKEMON}/pending`
);

export const searchPokemonSuccess = createAction<{
  pokemon: Pokemon[];
  searchText: string;
}>(`${SEARCH_POKEMON}/fulfilled`);

export const loadPokemonPending = createAction<Pokemon>(
  `${GET_POKEMON}/pending`
);

export const loadPokemonSuccess = createAction<Pokemon>(
  `${GET_POKEMON}/fulfilled`
);

export const searchPokemon = createAsyncThunk<
  { pokemon: Pokemon[]; searchText: string },
  string
>(SEARCH_POKEMON, async (searchText) => {
  if (cancel) {
    cancel();
  }
  const response = await axios.get<Pokemon[]>(
    `${pokemonUrl}/pokemon?searchText=${searchText}`,
    {
      cancelToken: new axios.CancelToken((c: Canceler) => (cancel = c)),
    }
  );
  return { pokemon: response.data, searchText };
});

export const loadPokemon = createAsyncThunk<Pokemon, string>(
  GET_POKEMON,
  async (pokeNumber) => {
    const response = await axios.get<Pokemon>(
      `${pokemonUrl}/pokemon/${pokeNumber}`
    );
    return response.data;
  }
);
