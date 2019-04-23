import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateProduct} from '../store/products'

export class EditProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      price: '',
      diameter: '',
      waterproof: '',
      material: '',
      quantity: 0,
      strapColor: '',
      error: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    try {
      event.preventDefault()
      updateProduct(this.props.productid, this.state)
      this.setState({
        name: '',
        price: '',
        diameter: '',
        waterproof: '',
        material: '',
        quantity: 0,
        strapColor: '',
        error: ''
      })
    } catch (error) {
      this.setState({
        error: error.message
      })
    }
  }

  render() {
    console.log(this.props)
    return (
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />

          <label htmlFor="price">Price:</label>
          <input
            type="text"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
          />

          <label htmlFor="diameter">Diameter:</label>
          <input
            type="text"
            name="diameter"
            value={this.state.diameter}
            onChange={this.handleChange}
          />
          <button type="submit" className="submit">
            Submit
          </button>
          {this.state.error ? (
            <div className="error">{this.state.error}</div>
          ) : (
            ''
          )}
        </form>
        )
      </div>
    )
  }
}

export default EditProduct
