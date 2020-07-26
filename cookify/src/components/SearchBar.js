import React from 'react';

import './SearchBar.css';
//search bar for finding recipes

const SearchBar = (props) => {
  return (
    <div className='searchbar'>
      <label>Search for recipes</label>
      <input
        type='text'
        value={props.searchValue}
        onChange={(event) => {
          props.onSearchValueChange(event.target.value);
        }}
        onKeyUp={(event) => {
          if (event.keyCode === 13) {
            props.onEnter();
          }
        }}
      />
    </div>
  );
};

export default SearchBar;
