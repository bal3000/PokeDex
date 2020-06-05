import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import './PokemonSummary.scss';

import { AppState } from '../../../store';
import { loadPokemon } from '../../../store/pokemon/actions';
import { Pokemon } from '../../../models/pokemon.interface';
import { LinkingResource } from '../../../models/linking-resource.interface';
import Spinner from '../../common/spinner/Spinner';

interface PokemonSummaryStateProps {
  id: string;
  pokemonDetails: Pokemon;
  loading: boolean;
  loadPokemon: any;
}

interface PokemonSummaryProps {
  pokemon: LinkingResource;
}

type SummaryProps = PokemonSummaryStateProps & PokemonSummaryProps;

// ON CLICK SHOW THIS COMPONENT AND EITHER A) PASS IN POKEMON OR B) CALL THE THUNK HERE AND POPULATE THE STATE
// EITHER WAY I NEED TO HAVE A DICTONARY IN THE STATE WITH THE POKEMON NAME AS THE KEY

function PokemonSummary({
  id,
  pokemonDetails,
  loadPokemon,
}: SummaryProps): JSX.Element {
  useEffect(() => {
    if (!pokemonDetails) {
      loadPokemon(id);
    }
  }, [id]);

  return (
    <React.Fragment>
      {!!pokemonDetails ? (
        <div>
          <h2>{pokemonDetails.name}</h2>
          <img
            src={pokemonDetails.sprites.front_default}
            alt={pokemonDetails.name}
          />
        </div>
      ) : (
        <Spinner />
      )}
    </React.Fragment>
  );
}

// temp until phase 2
const mapStateToProps = (state: AppState, ownProps: PokemonSummaryProps) => {
  const split = ownProps.pokemon.url.split('/');
  const id = split[split.length - 2];
  return {
    id,
    pokemonDetails: state.pokemonDetails[id],
    loading: state.loading,
    pokemon: ownProps.pokemon,
  };
};

export default connect(mapStateToProps, { loadPokemon })(PokemonSummary);
