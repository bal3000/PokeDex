import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { GET_POKEMON_LIST } from './types';
import { PokemonList } from '../../models/pokemon-list.interface';

const pokeListUrl = 'https://pokeapi.co/api/v2/pokemon';

export const loadPokemonListPending = createAction<PokemonList>(
  `${GET_POKEMON_LIST}/pending`
);

export const loadPokemonListSuccess = createAction<PokemonList>(
  `${GET_POKEMON_LIST}/fulfilled`
);

export const loadPokemonList = createAsyncThunk<
  PokemonList,
  { offset: number; limit: number }
>(GET_POKEMON_LIST, async ({ offset, limit }, thunkApi) => {
  const response = await fetch(
    `${pokeListUrl}?offset=${offset}&limit=${limit}`
  );
  const pokemon = (await response.json()) as PokemonList;
  //thunkApi.dispatch(loadPokemonListSuccess(pokemon));
  return pokemon;
});
