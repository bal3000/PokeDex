import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { GET_POKEMON_LIST, GET_POKEMON } from './types';
import { PokemonList } from '../../models/pokemon-list.interface';
import { Pokemon } from '../../models/pokemon.interface';

const pokeListUrl = 'https://pokeapi.co/api/v2/pokemon';

export const loadPokemonListPending = createAction<PokemonList>(
  `${GET_POKEMON_LIST}/pending`
);

export const loadPokemonListSuccess = createAction<PokemonList>(
  `${GET_POKEMON_LIST}/fulfilled`
);

export const loadPokemonPending = createAction<Pokemon>(
  `${GET_POKEMON}/pending`
);

export const loadPokemonSuccess = createAction<Pokemon>(
  `${GET_POKEMON}/fulfilled`
);

export const loadPokemonList = createAsyncThunk<
  PokemonList,
  { offset: number; limit: number }
>(GET_POKEMON_LIST, async ({ offset, limit }, thunkApi) => {
  const response = await fetch(
    `${pokeListUrl}?offset=${offset}&limit=${limit}`
  );
  const pokemon = (await response.json()) as PokemonList;
  return pokemon;
});

export const loadPokemon = createAsyncThunk<Pokemon, string>(
  GET_POKEMON,
  async (pokeNumber, thunkApi) => {
    const response = await fetch(`${pokeListUrl}/${pokeNumber}`);
    const pokemon = (await response.json()) as Pokemon;
    return pokemon;
  }
);
