import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/products'
import {addToOrder, addToCart} from '../store/cart'
import {Link} from 'react-router-dom'

var stripe = Stripe('pk_test_BtVtkp5NeH03CaIuy8PkxJE900WxrX8oUQ')

export class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const {id} = this.props.match.params
    this.props.getOne(id)
  }

  handleClick() {
    stripe
      .redirectToCheckout({
        sessionId:
          '{{cs_mxqIDPPscu3mGoKbdoE6vulesoJr8Qr94jnS8ohofdRcADML9HiNDEEm8ZBT5}}'
      })
      .then(function(result) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
        result.error.message
      })
  }

  render() {
    const {singleProduct} = this.props
    return (
      <div className="singleProduct">
        <div className="back-button">
          <Link to="/products" className="singleLink">
            <h2>&larr; Go Back</h2>
          </Link>
          <img className="single_img" src={`/${singleProduct.imgUrl}`} />
        </div>
        <div className="single_info">
          <span className="single_name">{`The ${singleProduct.name}`}</span>
          <span>Diameter: {singleProduct.diameter}</span>
          <span>Waterproof: {singleProduct.waterproof}</span>
          <span>Material: {singleProduct.material}</span>
          <span>Strap Color: {singleProduct.strapColor}</span>
          <span>${(singleProduct.price / 100).toFixed(2)}</span>
          <button
            type="button"
            className="add-to-cart"
            onClick={() => this.handleClick(singleProduct)}
          >
            Add to cart
          </button>
        </div>
        <span>{this.props.singleProduct.name}</span>
        <span>diameter: {this.props.singleProduct.diameter}</span>
        <span>waterproof: {this.props.singleProduct.waterproof}</span>
        <span>material: {this.props.singleProduct.material}</span>
        <span>strap color: {this.props.singleProduct.strapColor}</span>
        <span>price: ${(this.props.singleProduct.price / 100).toFixed(2)}</span>
        <button className="checkout" onClick={() => this.handleClick}>
          checkout
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleProduct: state.products.singleProduct,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOne: id => dispatch(getSingleProduct(id)),
    addToCart: singleProduct => dispatch(addToCart(singleProduct)),
    addingToOrder: singleProduct => dispatch(addToOrder(singleProduct))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
