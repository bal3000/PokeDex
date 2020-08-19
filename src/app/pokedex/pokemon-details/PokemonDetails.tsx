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
import Abilities from './abilities/Abilities';

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
      <section className="jumbotron">
        <div className="container">
          <img
            className="img-fluid"
            src={pokemon.sprites.frontDefault}
            alt={pokemon.name}
          />
          <h1 className="display-4 text-capitalize">
            No.{pokemon.id} {pokemon.name}
          </h1>
          <p className="lead text-muted">{pokemon.species.genus}</p>
        </div>
      </section>
      <div className="py-5">
        <div className="container">
          <div className="row">
            <main role="main" className="col">
              <div ref={infoRef} className="row">
                <p className="col lead">{pokemon.species.flavorText}</p>
              </div>
              <BasicInfo pokemon={pokemon} />
              <Abilities abilities={pokemon.abilities} />
              <EvolutionChain />
            </main>
          </div>
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
