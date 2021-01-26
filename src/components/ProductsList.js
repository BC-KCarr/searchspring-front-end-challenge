import React from 'react'
import Product from './Product'

function ProductsList({ productsList }) {
  return (
    <div className='product-table'>
      {productsList && productsList.map((product, index) => (
        <Product product={product} key={index} />
      ))}
    </div>
  )
}

export default ProductsList
