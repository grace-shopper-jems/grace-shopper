import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setProducts} from '../store/products'
import {addToCart} from '../store/cart'

class Products extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    console.log('IN products COMPONENT DID MOUNT')
    this.props.settingProducts()
  }
  handleClick(product) {
    console.log('PRODUCT after handle click:', product)
    this.props.addingToCart(product)
  }
  render() {
    return (
      <div className="products">
        <div className="products__layout">
          {this.props.products.allProducts.map(product => {
            return (
              <div key={product.id} className="products__spacing">
                <div className="products__item">
                  <img
                    src="petit-melrose-white.jpeg"
                    className="products__img"
                  />
                  <span className="products__title">{product.name}</span>
                  <span className="products__text">{product.diameter}MM</span>
                  <span className="products__price">${product.price}</span>
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

      // <div>
      //   {this.props.products.allProducts.map(product => {
      //     return (
      //       <div key={product.id}>
      //         <h2>{product.name}</h2>
      //         <h3>{product.diameter}</h3>
      //         <h3>{product.price}</h3>
      //         <button type="button" onClick={() => this.handleClick(product)}>
      //           Add To Cart
      //         </button>
      //       </div>
      //     )
      //   })}
      // </div>
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
    addingToCart: product => dispatch(addToCart(product))
  }
}
export default connect(mapState, mapDispatch)(Products)
