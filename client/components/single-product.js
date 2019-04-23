import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/products'
import {addToOrder, addToCart} from '../store/cart'
import {Link} from 'react-router-dom'

export class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const {id} = this.props.match.params
    this.props.getOne(id)
  }

  handleClick(singleProduct) {
    this.props.addToCart(singleProduct)
    this.props.addingToOrder(singleProduct)
  }

  render() {
    const {singleProduct} = this.props
    return (
      <div className="singleProduct">
        <div className="back-button">
          <Link to="/products" className="singleLink">
            <h2>Go Back</h2>
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
