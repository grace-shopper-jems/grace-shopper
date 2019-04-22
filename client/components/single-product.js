import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/products'
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
    return (
      <div className="singleProduct">
        <div className="back-button">
          <Link to="/products" className="singleLink">
            <h2>return to all products page</h2>
          </Link>
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
  return {singleProduct: state.products.singleProduct}
}

const mapDispatchToProps = dispatch => {
  return {getOne: id => dispatch(getSingleProduct(id))}
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
