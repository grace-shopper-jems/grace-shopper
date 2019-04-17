import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {removeItem} from '../store/cart'
import {Order} from './order'
import {Link} from 'react-router-dom'
/**
 * COMPONENT
 */

export class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(product) {
    this.props.deleteFromCart(product)
  }

  render() {
    return (
      <div className="cart">
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
        <Link to="/order"> Order</Link>
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
    deleteFromCart: product => dispatch(removeItem(product))
  }
}

export default connect(mapState, mapDispatch)(Cart)
