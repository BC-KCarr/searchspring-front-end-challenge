import React from 'react'
import Product from './Product'

function ProductsList({ productsList }) {
  return (
    <div className='product-list'>
      {productsList && productsList.map((product, index) => (
        <Product product={product} key={index} />
      ))}
      {productsList.length === 0 && <h1 style={{ textAlign: "center" }}>No products found to display!</h1>}
    </div>
  )
}

export default ProductsList
