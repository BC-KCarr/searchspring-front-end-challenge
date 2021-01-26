import React from 'react'

function SearchBar({ keyword, setKeyword }) {
  return (
    <input value={keyword} placeholder="Search by name" onChange={(e) => setKeyword(e.target.value)} className="searchBar" />
  )
}

export default SearchBar