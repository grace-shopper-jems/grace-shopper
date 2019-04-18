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
    this.groupCart = this.groupCart.bind(this)
    this.total = this.total.bind(this)
  }

  handleClick(product, quantity) {
    this.props.deleteFromCart(product, quantity)
  }

  submitOrder(currentCart) {
    this.props.completeOrder(currentCart)
  }
  groupCart(cart) {
    let groupedCart = []
    for (let i = 0; i < cart.length; i++) {
      let id = cart[i].id
      let price = cart[i].price
      let name = cart[i].name
      let diameter = cart[i].diameter
      let material = cart[i].material
      let strapColor = cart[i].strapColor
      let waterproof = cart[i].waterproof
      if (groupedCart.findIndex(e => e.id === id) !== -1) {
        let index = groupedCart.findIndex(e => e.id === id)
        groupedCart[index].quantity++
      } else {
        groupedCart.push({
          id,
          price,
          name,
          diameter,
          material,
          strapColor,
          waterproof,
          quantity: 1
        })
      }
    }
    return groupedCart
  }
  total(cart) {
    let total = 0
    for (let i = 0; i < cart.length; i++) {
      let itemPrice = Number(cart[i].price)
      total += itemPrice
    }
    return total
  }
  render() {
    console.log(this.props.cart)
    return (
      <div className="cart">
        <h3>Here are all the products in your cart: </h3>
        {this.groupCart(this.props.cart.cart).map(eachProduct => {
          console.log('EACH PRODUCT', eachProduct)

          return (
            <div key={eachProduct.id}>
              <h2>Name: {eachProduct.name}</h2>
              <h2>Price: {eachProduct.price}</h2>
              <h2>Quantity: {eachProduct.quantity}</h2>
              <button
                type="button"
                onClick={() =>
                  this.handleClick(eachProduct, eachProduct.quantity)
                }
              >
                remove
              </button>
            </div>
          )
        })}
        <h1>Sub-Total: {this.total(this.props.cart.cart)}</h1>

        <Link
          to="/order"
          onClick={() => this.submitOrder(this.props.cart.cart)}
        >
          <button type="button">Order</button>
        </Link>
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
    deleteFromCart: (product, quantity) =>
      dispatch(removeItem(product, quantity)),
    completeOrder: currentCart => dispatch(completeOrder(currentCart))
  }
}

export default connect(mapState, mapDispatch)(Cart)
