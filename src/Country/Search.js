import React from "react";

const Search = ({ setSearchInput }) => {
  return (
    <input
      className="search-input"
      type="search"
      placeholder="Search for ..."
      onChange={(e) => setSearchInput(e.target.value)}
    />
  );
};

export default Search;
