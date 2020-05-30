import React, { Component } from 'react'
import axios from '../../axios-orders'

import Order from '../../components/Order/Order'
import withErrorHadnler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
	state = {
		orders: [],
		loading: true,
	}

	async componentDidMount() {
		try {
			const fetchOrders = []
			const res = await axios.get('/orders.json')

			for (let i in res.data) {
				fetchOrders.push({ ...res.data[i], id: i })
			}

			this.setState({ loading: false, orders: fetchOrders })
			console.log(this.state.orders)
		} catch (error) {
			this.setState({ loading: false })
			console.log(error)
		}
	}

	render() {
		return (
			<div>
				{this.state.orders.map((el) => {
					return (
						<Order
							key={el.id}
							ingredients={el.ingredients}
							price={el.price}
						/>
					)
				})}
			</div>
		)
	}
}

export default withErrorHadnler(Orders, axios)
