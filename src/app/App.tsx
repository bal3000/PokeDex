import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './common/header/Header';
import Pokedex from './pokedex/Pokedex';

import './App.scss';

function App(): JSX.Element {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route path="/pokedex" component={Pokedex} />
      </Switch>
    </div>
  );
}

export default App;
