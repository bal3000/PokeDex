import React from 'react';
import { useHistory } from 'react-router-dom';

import './PokemonCard.scss';
import { Pokemon } from '../../../../models/pokemon.interface';

interface PokemonCardProps {
  pokemon: Pokemon;
}

function PokemonCard({ pokemon }: PokemonCardProps): JSX.Element {
  const history = useHistory();

  const viewPokemon = () => {
    history.push(`/pokedex/${pokemon.id}`);
  };

  return (
    <div className="col-md-2">
      <div className="card mb-4 shadow-sm">
        <img
          className="img-fluid"
          src={pokemon.sprites.frontDefault}
          alt={pokemon.name}
        />
        <div className="card-body">
          <p className="card-text">
            No. {pokemon.id} {pokemon.name}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button
                onClick={viewPokemon}
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
