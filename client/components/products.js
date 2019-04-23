import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setProducts} from '../store/products'
import {addToOrder, addToCart} from '../store/cart'
import {Link} from 'react-router-dom'

class Products extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.settingProducts()
  }
  handleClick(product) {
    this.props.addToCart(product)
    this.props.addingToOrder(product)
  }

  render() {
    return (
      <div className="products">
        <div className="products__layout">
          {this.props.products.allProducts.map(product => {
            return (
              <div key={product.id} className="products__spacing">
                <div className="products__item">
                  <img src={product.imgUrl} className="products__img" />
                  <span className="products__title">
                    <Link
                      to={'/products/' + product.id}
                      key={product.id}
                      className="singleLink"
                    >
                      <h2>{product.name}</h2>
                    </Link>
                  </span>
                  <span className="products__text">{product.diameter}MM</span>
                  <span className="products__price">
                    ${(product.price / 100).toFixed(2)}
                  </span>

                  <button
                    type="button"
                    onClick={() => this.handleClick(product)}
                  >
                    add to cart
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    settingProducts: () => dispatch(setProducts()),
    addToCart: product => dispatch(addToCart(product)),
    addingToOrder: product => dispatch(addToOrder(product))
  }
}
export default connect(mapState, mapDispatch)(Products)
