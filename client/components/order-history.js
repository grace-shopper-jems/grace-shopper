import React, {Component} from 'react'
import {getOrderHistoryThunk} from '../store/user'
import {connect} from 'react-redux'

class OrderHistory extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getOrders()
  }
  render() {
    return (
      <div className="orderHistory">
        <h2>These are your orders:</h2>
        {this.props.orders.map(order => {
          return (
            <div key={order.id}>
              <h2>Date of order: {order.createdAt} </h2>
              <h1>{order.product.name}</h1>
              <img src={order.product.imgUrl} />
              <h1>{order.product.material}</h1>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.user.orders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrders: () => dispatch(getOrderHistoryThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
