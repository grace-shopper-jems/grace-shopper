import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  deleteItems,
  deleteSingleItem,
  incrementSingleItem
} from '../store/cart'
import Checkout from './payment'
/**
 * COMPONENT
 */

export class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.groupCart = this.groupCart.bind(this)
    this.total = this.total.bind(this)
    this.tax = this.tax.bind(this)
    this.handleClickMinus = this.handleClickMinus.bind(this)
    this.handleClickPlus = this.handleClickPlus.bind(this)
  }

  handleClick(product, quantity) {
    this.props.deleteFromCart(product, quantity)
  }
  handleClickMinus(product) {
    this.props.deleteSingleFromCart(product)
  }
  handleClickPlus(product) {
    this.props.incrementSingleFromCart(product)
  }

  groupCart() {
    const {cart} = this.props
    let groupedCart = []
    for (let i = 0; i < cart.cart.length; i++) {
      let id = cart.cart[i].id
      let price = cart.cart[i].price
      let name = cart.cart[i].name
      let diameter = cart.cart[i].diameter
      let material = cart.cart[i].material
      let strapColor = cart.cart[i].strapColor
      let waterproof = cart.cart[i].waterproof
      let imgUrl = cart.cart[i].imgUrl
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
          imgUrl,
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
    return (total / 100).toFixed(2)
  }

  tax(subtotal) {
    return (subtotal * 0.0875).toFixed(2)
  }

  render() {
    return (
      <div className="cart">
        <div className="sidemenu__close">
          <h1 className="sidemenu__title">
            Cart (<span className="cart__quantity">
              {this.props.cart.quantity}
            </span>)
          </h1>
          <a href="#" className="close-cart">
            <i className="far fa-times-circle" />
          </a>
        </div>
        {this.groupCart().map(eachProduct => {
          return (
            <div className="cart__item" key={eachProduct.id}>
              <div className="cart__item__img">
                <img src={eachProduct.imgUrl} />
              </div>
              <div className="cart__item__container">
                <h1 className="cart__item__name">{eachProduct.name}</h1>
                <p className="cart__item__paragraph">
                  {eachProduct.material}, {eachProduct.diameter},{' '}
                  {eachProduct.strapColor}
                </p>
                <div className="cart__item__controls">
                  <a
                    onClick={() =>
                      this.handleClick(eachProduct, eachProduct.quantity)
                    }
                  >
                    <i className="fas fa-trash" />
                  </a>
                  <a onClick={() => this.handleClickPlus(eachProduct)}>
                    <i className="fas fa-plus-circle" />
                  </a>
                  <span className="cart__item__quantity">
                    {eachProduct.quantity}
                  </span>
                  <a onClick={() => this.handleClickMinus(eachProduct)}>
                    <i className="fas fa-minus-circle" />
                  </a>
                  <span className="cart__item__x">x</span>
                  <span className="cart__item__price">
                    ${(eachProduct.price / 100).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
        <div className="total">
          <span className="total__title">Subtotal</span>
          <span className="total__price">
            ${this.total(this.props.cart.cart)}
          </span>
          <span className="total__title">Shipping</span>
          <span className="total__price">Free</span>
          <span className="total__title">Tax</span>
          <span className="total__price">
            ${this.tax(this.total(this.props.cart.cart))}
          </span>
          <div className="total__cart">
            <div className="total__group">
              <span className="total__cart__title">Total</span>
              <span className="total__cart__price">
                ${(
                  Number(this.tax(this.total(this.props.cart.cart))) +
                  Number(this.total(this.props.cart.cart))
                ).toFixed(2)}
              </span>
            </div>
              <Checkout
                cart={this.props.cart.cart}
                total={this.total(this.props.cart.cart)}
              />
        </div>
      </div>
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
      dispatch(deleteItems(product, quantity)),
    deleteSingleFromCart: product => dispatch(deleteSingleItem(product)),
    incrementSingleFromCart: product => dispatch(incrementSingleItem(product))
  }
}

export default connect(mapState, mapDispatch)(Cart)
