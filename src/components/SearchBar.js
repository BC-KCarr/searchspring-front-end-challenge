import React from 'react'

function SearchBar({ keyword, setKeyword, handleSubmit }) {
  return (
    <form className='wrapper' onSubmit={(e) => handleSubmit(e)}>
      <input value={keyword} placeholder="Search for Brand, Color, Size..." onChange={(e) => setKeyword(e.target.value)} className="searchBar" />
      <button type="submit" value="Submit">GO</button>
    </form>
  )
}

export default SearchBar