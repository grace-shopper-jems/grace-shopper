import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Cart = props => {
  const {cart} = props
  console.log(cart)
  return (
    <div>
      <h3>Here are all the products in your cart: </h3>
      {cart.map(eachProduct => {
        return(
          <div key={eachProduct.id}>
          <h2>Name: {eachProduct.name}</h2>
          <h2>Price: {eachProduct.price}</h2>
          </div>
        )
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
