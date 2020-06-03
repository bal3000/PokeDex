import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import './App.scss';
import { AppState } from '../store';
import { loadPokemonList } from '../store/pokemon/actions';
import { LinkingResource } from '../models/linking-resource.interface';

interface AppProps {
  pokemonList?: LinkingResource[];
  loading: boolean;
  loadPokemonList: any;
}

function App({ pokemonList, loading, loadPokemonList }: AppProps): JSX.Element {
  useEffect(() => {
    try {
      loadPokemonList({ offset: 0, limit: 50 });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="container-fluid">
      <div className="row justify-content-md-center">
        <div className="col-md-auto">
          {loading ? (
            <h1>LOADING...</h1>
          ) : (
            <ul>
              {pokemonList?.map((pokemon) => (
                <li key={pokemon.name}>{pokemon.name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: AppState) => {
  return {
    pokemonList: state.pokemon?.results,
    loading: state.loading,
  };
};

export default connect(mapStateToProps, { loadPokemonList })(App);
