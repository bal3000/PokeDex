import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './StrongAgainst.scss';
import { PokemonType } from '../../../../models/pokemon-type.interface';
import { Type } from '../../../../models/type.interface';
import { POKEAPI_URI } from '../../../common/constants';

interface StrongAgainstProps {
  types: PokemonType[];
}

function StrongAgainst({ types }: StrongAgainstProps): JSX.Element {
  const [typeDetails, setTypeDetails] = useState<Type[]>([]);

  useEffect(() => {
    getTypeDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTypeDetails = async () => {
    const typeIds = types.map((t) => t.id);
    const response = await axios.get<Type[]>(`${POKEAPI_URI}/types`);
    if (response.status !== 200) {
      setTypeDetails([]);
    }
    setTypeDetails(
      response.data.filter((t) => typeIds.some((i) => i === t.id))
    );
  };

  return <div></div>;
}

export default StrongAgainst;
