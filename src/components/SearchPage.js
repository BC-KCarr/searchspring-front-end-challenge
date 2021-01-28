import React, { useState, useCallback, useEffect } from 'react'
import SearchBar from './SearchBar'
import ProductsList from './ProductsList'
import Pagination from '@material-ui/lab/Pagination'
import { makeStyles } from '@material-ui/core/styles';
import logo from '../images/logo.png'
import { PaginationItem } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .Mui-selected': {
      backgroundColor: '#1a0e77',
      color: 'white'
    }
  }
}))

function SearchPage() {
  const [input, setInput] = useState('')
  const [query, setQuery] = useState('')
  const [error, setError] = useState(false)
  const [page, setPage] = useState(1)
  const [responseData, setResponseData] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [begin, setBegin] = useState(0)
  const [end, setEnd] = useState(0)
  const [totalResults, setTotalResults] = useState(0)
  const [loading, setLoading] = useState(false)

  const classes = useStyles();


  const fetchData = useCallback(() => {
    setLoading(true)
    fetch(`http://api.searchspring.net/api/search/search.json?siteId=scmq7n&resultsFormat=native&page=${page}&q=${query}`)
      .then(res => res.json())
      .then(res => {
        setLoading(false)
        setResponseData(res.results)
        setTotalPages(res.pagination.totalPages)
        setTotalResults(res.pagination.totalResults)
        setBegin(res.pagination.begin)
        setEnd(res.pagination.end)
      })
      .catch((err) => {
        setError(true)
        setLoading(false)
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

  function handleRender() {
    if (error) {
      return (
        <h1 style={{ textAlign: "center", color: "red" }}>Error loading data!</h1>
      )
    }
    if (loading) {
      return (
        <div style={{ textAlign: 'center' }}>
          <h1>Loading...</h1>
        </div>
      )
    } else {
      return (
        <>
          <h1 className='new-arrivals'>{query ? '' : 'NEW ARRIVALS!'}</h1>
          <div className='home'>
            <span className='home-text' onClick={() => {
              setQuery('')
              setPage(1)
            }}>Home</span>
            <span className='search-results-text' id='chevron'>&rsaquo;</span>
            <span className='search-results-text'>{query ? 'Search Results' : 'New Arrivals'}</span>
          </div>
          <div className='top-pagination-container'>
            <span className='results-numbers'>{`SHOWING ${begin}-${end} OF ${totalResults} RESULTS`}</span>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              className={classes.root}
              renderItem={(item) => <PaginationItem {...item} classes={{ selected: classes.selected }} />} />
          </div>
          <ProductsList productsList={responseData} />
          <div className='bottom-pagination-container'>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              className={classes.root}
              renderItem={(item) => <PaginationItem {...item} classes={{ selected: classes.selected }} />} />
          </div>
        </>
      )
    }

  }

  return (
    <div className='container'>
      <main className='main'>
        <header className='header'>
          <div className='logo-container'>
            <img src={logo} alt='logo' />
          </div>
          <SearchBar keyword={input} setKeyword={handleChange} handleSubmit={handleSubmit} />
        </header>
        <div className='nav'></div>
        {handleRender()}
      </main>
      <footer className='footer'>
        <p>All rights reserved</p>
      </footer>
    </div>
  )
}

export default SearchPage
