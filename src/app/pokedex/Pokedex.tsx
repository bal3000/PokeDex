/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import './Pokedex.scss';

import { AppState } from '../../store';
import { loadPokemonList } from '../../store/pokemon/actions';
import { LinkingResource } from '../../models/linking-resource.interface';
import Spinner from '../common/spinner/Spinner';

interface PokedexProps {
  pokemonList?: LinkingResource[];
  loading: boolean;
  loadPokemonList: any;
}

function Pokedex({
  pokemonList,
  loading,
  loadPokemonList,
}: PokedexProps): JSX.Element {
  useEffect(() => {
    try {
      if (!pokemonList || pokemonList?.length === 0) {
        loadPokemonList({ offset: 0, limit: 50 });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getNumber = (pokemon: LinkingResource): string => {
    const split = pokemon.url.split('/');
    return split[split.length - 2];
  };

  return (
    <div className="row">
      <div className="col-8">
        {/* poke image here on select otherwise placeholder */}
      </div>
      <div className="col-4">
        {loading ? (
          <Spinner />
        ) : (
          <div className="list-group">
            {pokemonList?.map((pokemon) => (
              <a
                href="#"
                key={pokemon.name}
                className="list-group-item list-group-item-action"
              >
                No. {getNumber(pokemon)} {pokemon.name}
              </a>
            ))}
          </div>
        )}
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

export default connect(mapStateToProps, { loadPokemonList })(Pokedex);
