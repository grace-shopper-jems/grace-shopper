import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Cart = props => {
  const {cart} = props

  return (
    <div>
      <h3>Here are all the products in your cart: </h3>
      {cart.map(eachProduct => {
        
          <h2>Name: {eachProduct.name}</h2>
          <h2>Price: {eachProduct.price}</h2>
        
      })}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    cart: state.cart
  }
}

export default connect(mapState)(Cart)
