import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setProducts} from '../store/products'

export class Products extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        {this.props.products.map(product => {
          return (
            <div key={product.id}>
              <h2>{product.name}</h2>
              <h3>{product.diameter}</h3>
              <h3>{product.price}</h3>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(setProducts())
  }
}
export default connect(mapState, mapDispatch)(Products)
