import React from 'react'
import imageNotFound from '../image-not-found.png'

function Product({ product }) {

  function checkPrice() {
    if (parseInt(product.msrp) > parseInt(product.price)) {
      return (
        <div>
          <span className='product-price'>{`$${parseInt(product.price).toFixed(2)}`}</span>
          <span className='sales-price' style={{ textDecoration: 'line-through' }}>{`$${parseInt(product.msrp).toFixed(2)}`}</span>
        </div>
      )
    } else {
      return (
        <span className='product-price'>{`$${parseInt(product.price).toFixed(2)}`}</span>
      )
    }
  }

  // I believe this could possibly lead to an infinite callback if the fallback image also fails to load
  // to solve this I could use a errored state that is set when error occurs
  function addDefaultSrc(event) {
    event.target.src = imageNotFound
  }


  return (
    <div className='product-container'>
      <div className='product-image-container'>
        <img className='product-image' src={product.thumbnailImageUrl} alt='' onError={addDefaultSrc}  />
      </div>
      <div className='product-details'>
        <p>{product.name}</p>
        {checkPrice()}
      </div>
    </div>
  )
}

export default Product
