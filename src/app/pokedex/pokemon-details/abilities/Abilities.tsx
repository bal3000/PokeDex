import React from 'react';

import './Abilities.scss';

import { Ability } from '../../../../models/ability.interface';

interface AbilitiesProps {
  abilities: Ability[];
}

const Abilities = ({ abilities }: AbilitiesProps): JSX.Element => {
  return (
    <div className="row border-top">
      <div className="col">
        <h3>Abilities</h3>
        {abilities.map((ability) => (
          <div key={ability.slot} className="ability shadow p-1">
            <span className="text-capitalize">
              {ability.name.replace('-', ' ')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Abilities;
