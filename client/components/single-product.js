import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/products'
import {Link} from 'react-router-dom'

export class SingleProduct extends Component {
  async componentDidMount() {
    const {id} = Number(this.props.match.params)
    await this.props.getOne(this.props.match.params.id)
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
