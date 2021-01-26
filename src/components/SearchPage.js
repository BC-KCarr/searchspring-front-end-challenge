import React, { useState, useCallback, useEffect } from 'react'
import SearchBar from './SearchBar'
import ProductsList from './ProductsList'
import Pagination from '@material-ui/lab/Pagination'

function SearchPage() {
  const [input, setInput] = useState('')
  const [responseData, setResponseData] = useState([])
  const [error, setError] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const fetchData = useCallback(() => {
    fetch(`http://api.searchspring.net/api/search/search.json?siteId=scmq7n&resultsFormat=native&page=${page}&q=${input}`)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setResponseData(res.results)
        setTotalPages(res.pagination.totalPages)
      })
      .catch((err) => {
        setError(true)
        console.log(err)
      })
  }, [input, page])

  useEffect(() => {
    fetchData()
  }, [fetchData])


  function handleChange(input) {
    setInput(input)
  }

  function handlePageChange(event, value) {
    setPage(value)
  }

  return (
    <div className='container'>
      <SearchBar keyword={input} setKeyword={handleChange} />
      <Pagination count={totalPages} page={page} onChange={handlePageChange} />
      <ProductsList productsList={responseData} />
      <Pagination count={totalPages} page={page} onChange={handlePageChange} />
    </div>
  )
}

export default SearchPage
