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
              {singleProduct.diameter && (
                <div className="admin_single_info">
                  <span>{`Diameter: ${singleProduct.diameter}`}</span>
                  <span>{`Price: ${singleProduct.price}`}</span>
                  <span>{`Strap Color: ${singleProduct.strapColor}`}</span>
                  <span>{`Material: ${singleProduct.material}`}</span>
                  <span>{`Waterproof?: ${singleProduct.waterproof}`}</span>
                  <span>{`Quantity: ${singleProduct.quantity}`}</span>
                </div>
              )
              }
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
