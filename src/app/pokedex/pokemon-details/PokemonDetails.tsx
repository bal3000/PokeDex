import React, { useEffect } from 'react';
import { match } from 'react-router-dom';
import { connect } from 'react-redux';

import './PokemonDetails.scss';

import { AppState } from '../../../store';
import { loadPokemon, getTypes } from '../../../store/pokemon/actions';
import { Pokemon } from '../../../models/pokemon.interface';
import { Type } from '../../../models/type.interface';
import Spinner from '../../common/spinner/Spinner';
import EvolutionChain from './evolution-chain/EvolutionChain';
import BasicInfo from './basic-info/BasicInfo';
import Abilities from './abilities/Abilities';
import PokemonTypes from './pokemon-types/PokemonTypes';

interface PokemonDetailsStateProps {
  pokemon?: Pokemon;
  loading: boolean;
  loadPokemon: any;
  types: Type[];
  getTypes: any;
}

interface PokemonDetailsProps {
  id: number;
  match: match<{ id: string }>;
}

type DetailProps = PokemonDetailsStateProps & PokemonDetailsProps;

function PokemonDetails(props: DetailProps): JSX.Element {
  useEffect(() => {
    if (!props.pokemon) {
      props.loadPokemon(props.id);
    }
    if (!props.types.length) {
      props.getTypes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTypeDetails = (): Type[] => {
    const pokemonTypes = props.pokemon!.types.map((pt) => pt.id);
    const typeDetails = props.types.filter((t) =>
      pokemonTypes.some((pt) => pt === t.id)
    );
    return typeDetails;
  };

  return !props.pokemon || props.loading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <section className="jumbotron">
        <div className="container">
          <img
            className="img-fluid"
            src={props.pokemon.sprites.frontDefault}
            alt={props.pokemon.name}
          />
          <h1 className="display-4 text-capitalize">
            No.{props.pokemon.id} {props.pokemon.name}
          </h1>
          <p className="lead text-muted">{props.pokemon.species.genus}</p>
        </div>
      </section>
      <div className="py-5">
        <div className="container">
          <div className="row">
            <main role="main" className="col">
              <div className="row">
                <p className="col lead">{props.pokemon.species.flavorText}</p>
              </div>
              <BasicInfo pokemon={props.pokemon} />
              <Abilities abilities={props.pokemon.abilities} />
              <EvolutionChain />
              {props.types.length > 0 || (
                <PokemonTypes types={getTypeDetails()} />
              )}
              {/* WeakAgainst */}
              {/* Moves */}
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
    pokemon,
    loading: state.loading,
    types: state.types,
  };
};

export default connect(mapStateToProps, { loadPokemon })(PokemonDetails);
