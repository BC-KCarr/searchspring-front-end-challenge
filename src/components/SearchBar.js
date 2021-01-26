import React from 'react'
import SearchIcon from '@material-ui/icons/Search';

function SearchBar({ keyword, setKeyword, handleSubmit }) {
  return (
    <form className='wrapper' onSubmit={(e) => handleSubmit(e)}>
      <input value={keyword} placeholder="Search for Brand, Color, Size..." onChange={(e) => setKeyword(e.target.value)} className="searchBar" />
      <button type="submit" value="Submit">
        <SearchIcon />
      </button>
    </form>
  )
}

export default SearchBar