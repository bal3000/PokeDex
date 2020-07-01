import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { Canceler } from 'axios';

import { GET_POKEMON, SEARCH_POKEMON } from './types';
import { Pokemon } from '../../models/pokemon.interface';

const pokemonUrl = 'http://api.pokedex.com/pokemon';
const movesUrl = 'http://api.pokedex.com/moves';
const typesUrl = 'http://api.pokedex.com/types';

let cancel: Canceler;

export const searchPokemonPending = createAction<Pokemon[]>(
  `${SEARCH_POKEMON}/pending`
);

export const searchPokemonSuccess = createAction<Pokemon[]>(
  `${SEARCH_POKEMON}/fulfilled`
);

export const loadPokemonPending = createAction<Pokemon>(
  `${GET_POKEMON}/pending`
);

export const loadPokemonSuccess = createAction<Pokemon>(
  `${GET_POKEMON}/fulfilled`
);

export const searchPokemon = createAsyncThunk<Pokemon[], string>(
  SEARCH_POKEMON,
  async (searchText) => {
    if (cancel) {
      cancel();
    }
    const response = await axios.get<Pokemon[]>(
      `${pokemonUrl}?searchText=${searchText}`,
      {
        cancelToken: new axios.CancelToken((c: Canceler) => (cancel = c)),
      }
    );
    return response.data;
  }
);

export const loadPokemon = createAsyncThunk<Pokemon, string>(
  GET_POKEMON,
  async (pokeNumber) => {
    const response = await axios.get<Pokemon>(`${pokemonUrl}/${pokeNumber}`);
    return response.data;
  }
);
