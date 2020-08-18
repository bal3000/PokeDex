import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './PokemonSearch.scss';

import { AppState } from '../../../store';
import { searchPokemon } from '../../../store/pokemon/actions';
import { Pokemon } from '../../../models/pokemon.interface';
import Spinner from '../../common/spinner/Spinner';
import SearchBox from '../../common/search/SearchBox';

interface PokemonSearchProps {
  results: Pokemon[];
  loading: boolean;
  searchPokemon: any;
}

function PokemonSearch({
  results,
  loading,
  searchPokemon,
}: PokemonSearchProps): JSX.Element {
  const listItemClass = 'list-group-item list-group-item-action';
  const [searchText, setSearchText] = useState('');
  const [noResults, setNoResults] = useState(true);

  useEffect(() => {
    setNoResults(true);
    if (searchText && searchText.length >= 3) {
      setNoResults(false);
      searchPokemon(searchText);
    }
  }, [searchText]);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setSearchText(value);
  };

  return (
    <React.Fragment>
      <section className="jumbotron text-center">
        <div className="container">
          <h1>Pokedex</h1>
          <p className="lead text-muted">Search for a pokemon or type</p>
          <SearchBox text={searchText} searchChanged={handleChange}></SearchBox>
        </div>
      </section>
      <div className="row justify-content-md-center">
        <div className="col">
          {noResults ? (
            'No results'
          ) : (
            <div className="row align-items-end">
              {loading ? (
                <Spinner />
              ) : (
                results.map((pokemon) => (
                  <div key={pokemon.id} className="col-4">
                    <Link
                      className={listItemClass}
                      to={`/pokedex/${pokemon.id}`}
                    >
                      <img
                        className="img-fluid"
                        src={pokemon.sprites.frontDefault}
                        alt={pokemon.name}
                      />
                      No. {pokemon.id} {pokemon.name}
                    </Link>
                  </div>
                ))
              )}
            </div>
          )}
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

export default connect(mapStateToProps, { searchPokemon })(PokemonSearch);
