import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setProducts, getProducts} from '../store/products'

class Products extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('IN products COMPONENT DID MOUNT')
    this.props.settingProducts()
  }
  render() {
    console.log(this.props)
    return (
      <div>
        {this.props.products.allProducts.map(product => {
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
    settingProducts: () => dispatch(setProducts())
  }
}
export default connect(mapState, mapDispatch)(Products)
