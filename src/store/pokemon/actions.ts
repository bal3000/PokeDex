import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { GET_POKEMON_LIST, GET_POKEMON } from './types';
import { PokemonList } from '../../models/pokemon-list.interface';
import { Pokemon } from '../../models/pokemon.interface';
import { PokemonSpecies } from '../../models/pokemon-species.interface';

const pokemonUrl = 'https://pokeapi.co/api/v2';

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
>(GET_POKEMON_LIST, async ({ offset, limit }) => {
  const response = await axios.get<PokemonList>(
    `${pokemonUrl}/pokemon?offset=${offset}&limit=${limit}`
  );
  return response.data;
});

export const loadPokemon = createAsyncThunk<Pokemon, string>(
  GET_POKEMON,
  async (pokeNumber) => {
    const pokemonResponse = await axios.get<Pokemon>(
      `${pokemonUrl}/pokemon/${pokeNumber}`
    );
    const speciesResponse = await axios.get<PokemonSpecies>(
      `${pokemonUrl}/pokemon-species/${pokeNumber}`
    );
    pokemonResponse.data.species.details = speciesResponse.data;
    return pokemonResponse.data;
  }
);
