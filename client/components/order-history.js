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
    console.log('this.props.orders', this.props.orders)
    return (
      <div className="orderHistory">
        <h2>These are your orders:</h2>
        {this.props.orders.map(order => {
          return <h2 key={order.id}>{order.updatedAt} </h2>
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
