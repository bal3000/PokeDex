import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import './PokemonSummary.scss';

import { AppState } from '../../../store';
import { loadPokemon } from '../../../store/pokemon/actions';
import { Pokemon } from '../../../models/pokemon.interface';
import Spinner from '../../common/spinner/Spinner';

interface PokemonSummaryStateProps {
  pokemon?: Pokemon;
  loading: boolean;
  loadPokemon: any;
}

interface PokemonSummaryProps {
  id: number;
}

type SummaryProps = PokemonSummaryStateProps & PokemonSummaryProps;

function PokemonSummary({
  id,
  pokemon,
  loadPokemon,
}: SummaryProps): JSX.Element {
  useEffect(() => {
    if (!pokemon) {
      loadPokemon(id);
    }
  }, [id]);

  const getTypeIcon = (type: string): string => {
    return `${process.env.PUBLIC_URL}/images/icon_${type.toLowerCase()}.png`;
  };
  const getSpriteOrGif = (): string => {
    return `${process.env.PUBLIC_URL}/images/${id}.gif`;
  };

  return (
    <React.Fragment>
      {!!pokemon ? (
        <div className="pokedetails row align-items-center justify-content-md-center">
          <div className="col-4">
            <img
              className="img-fluid w-50"
              src={
                id === 6 || id === 25 || id === 26
                  ? getSpriteOrGif()
                  : pokemon.sprites.frontDefault
              }
              alt={pokemon.name}
            />
          </div>
          <div className="col-4">
            <div className="card">
              <h5 className="card-header">
                No.{pokemon.id} {pokemon.name}
              </h5>
              <div className="card-body">
                <div className="row">
                  <div className="col label">Type</div>
                  <div className="col">
                    {pokemon.types.map((type) => (
                      <img
                        key={type.name}
                        className="type-icon img-fluid w-25"
                        src={getTypeIcon(type.name)}
                        alt={type.name}
                      />
                    ))}
                  </div>
                </div>
                <div className="row">
                  <div className="col label">Height</div>
                  <div className="col">{pokemon.height}</div>
                </div>
                <div className="row">
                  <div className="col label">Weight</div>
                  <div className="col">{pokemon.weight}</div>
                </div>
                <div className="row">
                  <p>{pokemon.species?.flavorText}</p>
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

const mapStateToProps = (state: AppState, ownProps: PokemonSummaryProps) => {
  return {
    id: ownProps.id,
    pokemon: state.selectedPokemon,
    loading: state.loading,
  };
};

export default connect(mapStateToProps, { loadPokemon })(PokemonSummary);
