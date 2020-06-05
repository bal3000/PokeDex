/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import './Pokedex.scss';

import { AppState } from '../../store';
import { loadPokemonList } from '../../store/pokemon/actions';
import { LinkingResource } from '../../models/linking-resource.interface';
import Spinner from '../common/spinner/Spinner';
import PokemonSummary from './pokemon-summary/PokemonSummary';

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
  const listItemClass = 'list-group-item list-group-item-action';
  const [selectedPokemon, setSelectedPokemon] = useState({ name: '', url: '' });

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

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    poke: LinkingResource
  ) => {
    event.preventDefault();
    setSelectedPokemon(poke);
  };

  return (
    <div className="row">
      <div className="col-8">
        {selectedPokemon.url.length ? (
          <PokemonSummary pokemon={selectedPokemon} />
        ) : (
          <div className="row justify-content-md-center">
            <p>Please select a pokemon</p>
          </div>
        )}
      </div>
      <div className="col-4">
        {loading ? (
          <Spinner />
        ) : (
          <div className="list-group">
            {pokemonList?.map((pokemon) => (
              <a
                onClick={(e) => handleClick(e, pokemon)}
                href="#"
                key={pokemon.name}
                className={
                  selectedPokemon.name === pokemon.name
                    ? `${listItemClass} active`
                    : listItemClass
                }
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
