import React, { useEffect, useState } from 'react';
import { Link, match } from 'react-router-dom';
import { connect } from 'react-redux';

import './PokemonDetails.scss';

import { AppState } from '../../../store';
import { loadPokemon } from '../../../store/pokemon/actions';
import { Pokemon } from '../../../models/pokemon.interface';
import SearchBox from '../../common/search/SearchBox';
import Spinner from '../../common/spinner/Spinner';

interface PokemonDetailsStateProps {
  pokemon?: Pokemon;
  loading: boolean;
  loadPokemon: any;
}

interface PokemonDetailsProps {
  id: number;
  match: match<{ id: string }>;
}

type DetailProps = PokemonDetailsStateProps & PokemonDetailsProps;

function PokemonDetails({
  id,
  pokemon,
  loading,
  loadPokemon,
}: DetailProps): JSX.Element {
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (!pokemon) {
      loadPokemon(id);
    }
  }, []);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setSearchText(value);
  };

  return !pokemon || loading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <SearchBox text={searchText} searchChanged={handleChange}></SearchBox>
      </nav>

      <div className="container-fluid">
        <div className="row">
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
          >
            <div className="sidebar-sticky pt-3">
              <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>{`${pokemon.name} data`}</span>
              </h6>
              <ul className="nav flex-column mb-2">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="file-text"></span>
                    Current month
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="file-text"></span>
                    Last quarter
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="file-text"></span>
                    Social engagement
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <span data-feather="file-text"></span>
                    Year-end sale
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <div className="d-flex row justify-content-md-center flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <div className="col">
                <div className="row">
                  <img
                    className="img-fluid w-50"
                    src={pokemon.sprites.frontDefault}
                    alt={pokemon.name}
                  />
                </div>
                <div className="row">
                  <h1 className="h2 text-capitalize">{pokemon.name}</h1>
                  <p className="lead">{pokemon.species.flavorText}</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state: AppState, ownProps: PokemonDetailsProps) => {
  const param = ownProps.match.params.id;
  const id = parseInt(param);
  let pokemon = state.pokemon.find((p) => p.id === id);
  if (!pokemon && state.selectedPokemon?.id === id) {
    pokemon = state.selectedPokemon;
  }
  return {
    id,
    pokemon: pokemon,
    loading: state.loading,
  };
};

export default connect(mapStateToProps, { loadPokemon })(PokemonDetails);
