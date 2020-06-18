import React from 'react';

import './SearchBox.scss';

interface SearchProps {
  text: string;
  searchChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox = ({ text, searchChanged }: SearchProps) => {
  return (
    <input
      type="text"
      name="search-bar"
      className="form-control"
      placeholder="Search by pokemon name or type"
      value={text}
      onChange={searchChanged}
    />
  );
};

export default SearchBox;
