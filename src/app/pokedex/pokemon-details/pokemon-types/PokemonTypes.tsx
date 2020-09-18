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

  const attackStrongAgainst = (): React.ReactNode => {
    const doubleDamage = types.flatMap(
      (type) => type.damageRelations.doubleDamageTo
    );

    return (
      <React.Fragment>
        <h4>Super-effective against</h4>
        {createIcons(doubleDamage)}
      </React.Fragment>
    );
  };

  const attackWeakAgainst = (): React.ReactNode => {
    let halfDamage = types.flatMap((type) => type.damageRelations.halfDamageTo);

    return (
      <React.Fragment>
        <h4>Not very effective against</h4>
        {createIcons(halfDamage)}
      </React.Fragment>
    );
  };

  const defendWeakAgainst = (): React.ReactNode => {
    let doubleDamage = types.flatMap(
      (type) => type.damageRelations.doubleDamageFrom
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

    doubleDamage = doubleDamage.filter(
      (dmg) => !fourTimesDamage.some((f) => f.id === dmg.id)
    );

    return (
      <React.Fragment>
        <h4>Weak against</h4>
        {createIcons(doubleDamage)}
        {fourTimesDamage.length > 0 || (
          <div>
            <h3>Four Times Damage From:</h3>
            {fourTimesDamage.map((dmg) => generateTypeImg(dmg))}
          </div>
        )}
      </React.Fragment>
    );
  };

  const defendStrongAgainst = (): React.ReactNode => {
    let halfDamage = types.flatMap(
      (type) => type.damageRelations.halfDamageFrom
    );
    const fourTimesDamage: LinkingResource[] = [];
    halfDamage.forEach((dmg) => {
      if (!fourTimesDamage.some((fdmg) => fdmg.id === dmg.id)) {
        const dmgCount = halfDamage.filter(
          (compareDmg) => compareDmg.id === dmg.id
        ).length;
        if (dmgCount > 1) {
          fourTimesDamage.push(dmg);
        }
      }
    });

    halfDamage = halfDamage.filter(
      (dmg) => !fourTimesDamage.some((f) => f.id === dmg.id)
    );

    return (
      <React.Fragment>
        <h4>Strong against</h4>
        {createIcons(halfDamage)}
        {fourTimesDamage.length > 0 || (
          <div>
            <h3>1/4 Damage From:</h3>
            {fourTimesDamage.map((dmg) => generateTypeImg(dmg))}
          </div>
        )}
      </React.Fragment>
    );
  };

  const createIcons = (damage: LinkingResource[]): React.ReactNode => {
    return damage
      .filter(
        (value, index, self) =>
          self.findIndex((f) => f.id === value.id) === index
      )
      .map((dmg) => generateTypeImg(dmg));
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
          <div className="col">{defendWeakAgainst()}</div>
          <div className="col">{defendStrongAgainst()}</div>
        </div>
      </div>
    </div>
  );
}

export default PokemonTypes;
