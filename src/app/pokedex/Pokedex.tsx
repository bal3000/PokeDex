/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import './Pokedex.scss';

import { AppState } from '../../store';
import { searchPokemon } from '../../store/pokemon/actions';
import { Pokemon } from '../../models/pokemon.interface';
import Spinner from '../common/spinner/Spinner';
import PokemonSummary from './pokemon-summary/PokemonSummary';

interface PokedexProps {
  results: Pokemon[];
  loading: boolean;
  searchPokemon: any;
}

function Pokedex({
  results,
  loading,
  searchPokemon,
}: PokedexProps): JSX.Element {
  const listItemClass = 'list-group-item list-group-item-action';
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (searchText && searchText.length >= 3) {
      searchPokemon(searchText);
    }
  }, [searchText]);

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    poke: Pokemon
  ) => {
    event.preventDefault();
  };

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setSearchText(value);
  };

  return (
    <React.Fragment>
      <div className="row justify-content-md-center">
        <div className="col">
          <div className="row align-items-start">
            <div className="col">
              <input
                type="text"
                name="search-bar"
                className="form-control"
                placeholder="Search by pokemon name or type"
                value={searchText}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row align-items-end">
            {loading ? (
              <Spinner />
            ) : (
              results.map((pokemon) => (
                <div className="col-4">
                  <a
                    onClick={(e) => handleClick(e, pokemon)}
                    href="#"
                    key={pokemon.name}
                    className={listItemClass}
                  >
                    <img
                      className="img-fluid"
                      src={pokemon.sprites.frontDefault}
                      alt={pokemon.name}
                    />
                    No. {pokemon.id} {pokemon.name}
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state: AppState) => {
  return {
    results: state.pokemon,
    loading: state.loading,
  };
};

export default connect(mapStateToProps, { searchPokemon })(Pokedex);
