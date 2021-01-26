import React, { useState, useCallback, useEffect } from 'react'
import SearchBar from './SearchBar'
import ProductsList from './ProductsList'
import Pagination from '@material-ui/lab/Pagination'

function SearchPage() {
  const [input, setInput] = useState('')
  const [query, setQuery] = useState('')
  const [error, setError] = useState(false)
  const [page, setPage] = useState(1)
  const [responseData, setResponseData] = useState([])
  const [totalPages, setTotalPages] = useState(0)

  const fetchData = useCallback(() => {
    fetch(`http://api.searchspring.net/api/search/search.json?siteId=scmq7n&resultsFormat=native&page=${page}&q=${query}`)
      .then(res => res.json())
      .then(res => {
        setResponseData(res.results)
        setTotalPages(res.pagination.totalPages)
      })
      .catch((err) => {
        setError(true)
        console.log(err)
      })
  }, [query, page])

  useEffect(() => {
    fetchData()
  }, [fetchData])


  function handleChange(value) {
    setInput(value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    setQuery(input)
    setInput('')
  }

  function handlePageChange(event, value) {
    setPage(value)
  }

  return (
    <div className='container'>
      <SearchBar keyword={input} setKeyword={handleChange} handleSubmit={handleSubmit} />
      <Pagination count={totalPages} page={page} onChange={handlePageChange} />
      {error && <h1 style={{textAlign: "center", color: "red" }}>Error loading data!</h1>}
      <ProductsList productsList={responseData} />
      <Pagination count={totalPages} page={page} onChange={handlePageChange} />
    </div>
  )
}

export default SearchPage
