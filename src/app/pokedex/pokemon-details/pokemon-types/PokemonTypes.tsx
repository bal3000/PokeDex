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

  const attackStrongAgainst = (): JSX.Element => {
    const doubleDamage = types.flatMap(
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
      <React.Fragment>
        <h4>Super-effective against</h4>
        {doubleDamage
          .filter(
            (value, index, self) =>
              self.findIndex((f) => f.id === value.id) === index
          )
          .map((dmg) => generateTypeImg(dmg))}
        {/* <h3>Four Times Damage To:</h3>
        {fourTimesDamage.map((dmg) => generateTypeImg(dmg))} */}
      </React.Fragment>
    );
  };

  const attackWeakAgainst = (): JSX.Element => {
    let halfDamage = types.flatMap((type) => type.damageRelations.halfDamageTo);

    return (
      <React.Fragment>
        <h4>Not very effective against</h4>
        {halfDamage
          .filter(
            (value, index, self) =>
              self.findIndex((f) => f.id === value.id) === index
          )
          .map((dmg) => generateTypeImg(dmg))}
      </React.Fragment>
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
    <div className="row">
      <div className="col">
        <h3>Attack</h3>
        <div className="row">
          <div className="col">{attackStrongAgainst()}</div>
          <div className="col">{attackWeakAgainst()}</div>
        </div>
        <h3>Defense</h3>
        <div className="row">
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
}

export default PokemonTypes;
