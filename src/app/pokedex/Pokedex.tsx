import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './Pokedex.scss';

import PokemonSearch from './pokemon-search/PokemonSearch';
import PokemonDetails from './pokemon-details/PokemonDetails';

function Pokedex(): JSX.Element {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/pokedex/:id" component={PokemonDetails} />
        <Route path="/pokedex" exact={true} component={PokemonSearch} />
      </Switch>
    </React.Fragment>
  );
}

export default Pokedex;
