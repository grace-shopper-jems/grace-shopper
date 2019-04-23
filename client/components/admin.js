import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setProducts, getSingleProduct, deleteProduct} from '../store/products'

export class Admin extends Component {
  componentDidMount() {
    this.props.setProducts()
  }

  render() {
    const {singleProduct} = this.props
    return (
      <div className="admin">
        <div className="admin_product_list">
          {this.props.products.map(product => {
            return (
              <div key={product.id}>
                <span>{product.name}</span>
                <button onClick={() => this.props.getSingleProduct(product.id)}>
                  See details
                </button>
                <button>Edit</button>
                <button onClick={() => this.props.deleteItem(product.id)}>
                  Delete
                </button>
              </div>
            )
          })}
        </div>
        <div className="admin_product_info">
          {singleProduct && (
            <div key={singleProduct.id}>
              <img src={singleProduct.imgUrl} />
              <span>Diameter: {singleProduct.diameter}</span>
              <span>Price: {singleProduct.price}</span>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.allProducts,
    singleProduct: state.products.singleProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setProducts: () => dispatch(setProducts()),
    getSingleProduct: id => dispatch(getSingleProduct(id)),
    deleteItem: id => dispatch(deleteProduct(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
