import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setQuantity} from '../store/products'

const Quantity = props => {
  const handleChange = evt => {
    setQuantity(evt.target.value, props.id)
  }
  return (
    <div>
      <select onChange={handleChange}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {setQuantity: (num, id) => dispatch(setQuantity(num, id))}
}

export default connect(null, mapDispatchToProps)(Quantity)
