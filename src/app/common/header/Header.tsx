import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExample04"
        aria-controls="navbarsExample04"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExample04">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink
              to="/pokedex"
              className="nav-link"
              activeClassName="active"
            >
              PokeDex
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
