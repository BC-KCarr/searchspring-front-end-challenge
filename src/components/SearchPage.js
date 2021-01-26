import React, { useState, useCallback, useEffect } from 'react'
import SearchBar from './SearchBar'
import ProductsList from './ProductsList'

function SearchPage() {
  const [input, setInput] = useState('')
  const [responseData, setResponseData] = useState([])
  const [error, setError] = useState(false)

  const fetchData = useCallback(() => {
    fetch(`http://api.searchspring.net/api/search/search.json?siteId=scmq7n&resultsFormat=native&page=1&q=${input}`)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setResponseData(res.results)
      })
      .catch((err) => {
        setError(true)
        console.log(err)
      })
  }, [input])

  useEffect(() => {
    fetchData()
  }, [fetchData])


  function handleChange(input) {
    setInput(input)
  }

  return (
    <div className='container'>
      <SearchBar keyword={input} setKeyword={handleChange} />
      <ProductsList productsList={responseData} />
    </div>
  )
}

export default SearchPage
