import React from 'react';

import './PokemonTypes.scss';

import { Type } from '../../../../models/type.interface';
import { LinkingResource } from '../../../../models/linking-resource.interface';

interface PokemonTypesProps {
  types: Type[];
}

function PokemonTypes({ types }: PokemonTypesProps): JSX.Element {
  const getTypeIcon = (type: string): string => {
    return `${process.env.PUBLIC_URL}/images/icon_${type.toLowerCase()}.png`;
  };

  const strongAgainst = (): JSX.Element => {
    let doubleDamage = types.flatMap(
      (type) => type.damageRelations.doubleDamageTo
    );
    const fourTimesDamage: LinkingResource[] = [];
    doubleDamage.forEach((dmg) => {
      if (!fourTimesDamage.some((fdmg) => fdmg.id === dmg.id)) {
        const dmgCount = doubleDamage.filter(
          (compareDmg) => compareDmg.id === dmg.id
        ).length;
        if (dmgCount > 1) {
          fourTimesDamage.push(dmg);
        }
      }
    });

    // 4x damage does not work like this, comment out for now

    // doubleDamage = doubleDamage.filter(
    //   (dmg) => !fourTimesDamage.some((f) => f.id === dmg.id)
    // );

    return (
      <div>
        {doubleDamage.map((dmg) => generateTypeImg(dmg))}
        {/* <h3>Four Times Damage To:</h3>
        {fourTimesDamage.map((dmg) => generateTypeImg(dmg))} */}
      </div>
    );
  };

  const generateTypeImg = (type: LinkingResource): JSX.Element => {
    return (
      <div key={type.id} className="pokemon-type shadow p-1">
        <img
          className="type-icon"
          src={getTypeIcon(type.name)}
          alt={type.name}
        />
        <span className="text-capitalize">{type.name}</span>
      </div>
    );
  };

  return (
    <div>
      <h3>Strong against</h3>
      {strongAgainst()}
    </div>
  );
}

export default PokemonTypes;
