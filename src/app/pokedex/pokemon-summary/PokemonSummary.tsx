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

  const getTypeIcon = (type: string): string => {
    return `${process.env.PUBLIC_URL}/images/icon_${type.toLowerCase()}.png`;
  };

  return (
    <React.Fragment>
      {!!pokemonDetails ? (
        <div className="pokedetails row align-items-center justify-content-md-center">
          <div className="col-4">
            <img
              className="img-fluid"
              src={pokemonDetails.sprites.front_default}
              alt={pokemonDetails.name}
            />
          </div>
          <div className="col-4">
            <div className="card">
              <h5 className="card-header">
                No.{pokemonDetails.id} {pokemonDetails.name}
              </h5>
              <div className="card-body">
                <div className="row">
                  <div className="col label">Type</div>
                  <div className="col">
                    {pokemonDetails.types.map((type) => (
                      <img
                        key={type.type.name}
                        className="type-icon img-fluid w-25"
                        src={getTypeIcon(type.type.name)}
                        alt={type.type.name}
                      />
                    ))}
                  </div>
                </div>
                <div className="row">
                  <div className="col label">Height</div>
                  <div className="col">{pokemonDetails.height}</div>
                </div>
                <div className="row">
                  <div className="col label">Weight</div>
                  <div className="col">{pokemonDetails.weight}</div>
                </div>
              </div>
            </div>
          </div>
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
