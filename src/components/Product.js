import React from 'react'

function Product({product}) {
  console.log(product)
  return (
    <div className='productContainer'>
      <img src={product.thumbnailImageUrl} alt={product.name} />
      <p>{product.name}</p>
      <p>{product.price}</p>
    </div>
  )
}

export default Product
