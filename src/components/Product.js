import React from 'react'

function Product({ product }) {
  console.log(product)
  return (
    <div className='product-container'>
      <div className='product-image-container'>
        <img className='product-image' src={product.thumbnailImageUrl} alt='' />
      </div>
      <div className='product-details'>
        <p>{product.name}</p>
        <p>{product.price}</p>
      </div>
    </div>
  )
}

export default Product
