import React, { useEffect, useRef } from 'react';
import { match } from 'react-router-dom';
import { connect } from 'react-redux';

import './PokemonDetails.scss';

import { AppState } from '../../../store';
import { loadPokemon } from '../../../store/pokemon/actions';
import { Pokemon } from '../../../models/pokemon.interface';
import Spinner from '../../common/spinner/Spinner';
import EvolutionChain from './evolution-chain/EvolutionChain';
import BasicInfo from './basic-info/BasicInfo';

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

const scrollToRef = (ref: React.MutableRefObject<any>) =>
  window.scrollTo(0, ref.current.offsetTop);

function PokemonDetails({
  id,
  pokemon,
  loading,
  loadPokemon,
}: DetailProps): JSX.Element {
  const infoRef = useRef<any>(null);

  useEffect(() => {
    if (!pokemon) {
      loadPokemon(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToInformation = () => scrollToRef(infoRef);

  return !pokemon || loading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      {/* <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <Link
          to={'/pokedex'}
          className="navbar-brand col-md-3 col-lg-2 mr-0 px-3"
        >
          PokeDex
        </Link>
        <SearchBox text={searchText} searchChanged={handleChange}></SearchBox>
      </nav> */}

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
                <li className="nav-item" onClick={scrollToInformation}>
                  <span data-feather="file-text"></span>
                  Information
                </li>
              </ul>
            </div>
          </nav>

          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <div className="jumbotron jumbotron-fluid bg-white border-bottom">
              <div className="container">
                <img
                  className="img-fluid"
                  src={pokemon.sprites.frontDefault}
                  alt={pokemon.name}
                />
                <h1 className="display-4 text-capitalize">
                  No.{pokemon.id} {pokemon.name}
                </h1>
                <p className="lead">{pokemon.species.genus}</p>
              </div>
            </div>
            <div ref={infoRef} className="row">
              <p className="col lead">{pokemon.species.flavorText}</p>
            </div>
            <BasicInfo pokemon={pokemon} />
            <EvolutionChain />
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
