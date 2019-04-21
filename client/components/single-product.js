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

  async componentDidMount() {
    const {id} = this.props.match.params
    await this.props.getOne(id)
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
          <Link to={'/products'} className="singleLink">
            <h2>return to all products page</h2>
          </Link>
        </div>
        <span>{singleProduct.name}</span>
        <span>diameter: {singleProduct.diameter}</span>
        <span>waterproof: {singleProduct.waterproof}</span>
        <span>material: {singleProduct.material}</span>
        <span>strap color: {singleProduct.strapColor}</span>
        <span>price: ${singleProduct.price}</span>
        <button type="button" onClick={() => this.handleClick(singleProduct)}>
          Add to cart
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
