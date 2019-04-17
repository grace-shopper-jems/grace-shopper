import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {removeItem, completeOrder} from '../store/cart'
import {Link} from 'react-router-dom'
/**
 * COMPONENT
 */

export class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.submitOrder = this.submitOrder.bind(this)
  }

  handleClick(product) {
    this.props.deleteFromCart(product)
  }

  submitOrder(currentCart) {
    this.props.completeOrder(currentCart)
  }

  render() {
    return (
      <div>
        <h3>Here are all the products in your cart: </h3>
        {this.props.cart.map(eachProduct => {
          console.log('EACH PRODUCT', eachProduct)
          return (
            <div key={eachProduct.id}>
              <h2>Name: {eachProduct.name}</h2>
              <h2>Price: {eachProduct.price}</h2>
              <button
                type="button"
                onClick={() => this.handleClick(eachProduct)}
              >
                remove
              </button>
            </div>
          )
        })}
        <Link to="/order" onClick={()=> this.submitOrder(this.props.cart)}> Order</Link>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    deleteFromCart: product => dispatch(removeItem(product)),
    completeOrder: (currentCart) => dispatch(completeOrder(currentCart))
  }
}

export default connect(mapState, mapDispatch)(Cart)
