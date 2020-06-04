import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <ul className="nav nav-pills nav-justified">
      <li className="nav-item">
        <NavLink to="/" exact className="nav-link" activeClassName="active">
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/pokedex" className="nav-link" activeClassName="active">
          PokeDex
        </NavLink>
      </li>
    </ul>
  );
};

export default Header;
