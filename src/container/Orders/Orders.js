import React, { Component } from 'react'
import axios from '../../axios-orders'
import { connect } from 'react-redux'

import Order from '../../components/Order/Order'
import withErrorHadnler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
	componentDidMount() {
		this.props.onFetchOrders()
	}

	render() {
		let orders = <Spinner />
		if (!this.props.loading) {
			orders = this.props.orders.map((el) => {
				return (
					<Order
						key={el.id}
						ingredients={el.ingredients}
						price={el.price}
					/>
				)
			})
		}

		return <div>{orders}</div>
	}
}

const mapStateToProps = (state) => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchOrders: () => dispatch(actions.fetchOrders()),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHadnler(Orders, axios))
