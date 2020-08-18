import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import './PokemonSearch.scss';

import { AppState } from '../../../store';
import { searchPokemon } from '../../../store/pokemon/actions';
import { Pokemon } from '../../../models/pokemon.interface';
import Spinner from '../../common/spinner/Spinner';
import SearchBox from '../../common/search/SearchBox';
import PokemonCard from './pokemon-card/PokemonCard';

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
  const [searchText, setSearchText] = useState('');
  const [noResults, setNoResults] = useState(true);

  useEffect(() => {
    setNoResults(results.length === 0);
    if (searchText && searchText.length >= 3) {
      setNoResults(false);
      searchPokemon(searchText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="py-5 bg-light">
        <div className="container">
          <div className="row">
            {noResults ? (
              <p className="lead text-muted">No results</p>
            ) : loading ? (
              <Spinner />
            ) : (
              results.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
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

export default connect(mapStateToProps, { searchPokemon })(PokemonSearch);
