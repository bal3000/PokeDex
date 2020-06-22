import React from 'react';

import './BasicInfo.scss';
import { Pokemon } from '../../../../models/pokemon.interface';

interface BasicInfoProps {
  pokemon: Pokemon;
}

function BasicInfo({ pokemon }: BasicInfoProps) {
  const getTypeIcon = (type: string): string => {
    return `${process.env.PUBLIC_URL}/images/icon_${type.toLowerCase()}.png`;
  };

  return (
    <div className="row">
      <div className="col">
        <table className="table table-borderless">
          <tbody>
            <tr>
              <th scope="row">Type</th>
              <td>
                {pokemon.types.map((type) => (
                  <div key={type.id} className="pokemon-type shadow p-2">
                    <img
                      className="type-icon"
                      src={getTypeIcon(type.name)}
                      alt={type.name}
                    />
                    <span className="text-capitalize">{type.name}</span>
                  </div>
                ))}
              </td>
            </tr>
            <tr>
              <th scope="row">Height</th>
              <td>{pokemon.height}</td>
            </tr>
            <tr>
              <th scope="row">Weight</th>
              <td>{pokemon.weight}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="col">
        <table className="table table-borderless">
          <tbody>
            <tr>
              <th scope="row">Base Experience</th>
              <td>{pokemon.baseExperience}</td>
            </tr>
            <tr>
              <th scope="row">Base Happiness</th>
              <td>{pokemon.species.baseHappiness}</td>
            </tr>
            <tr>
              <th scope="row">Capture Rate</th>
              <td>{pokemon.species.captureRate}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BasicInfo;
