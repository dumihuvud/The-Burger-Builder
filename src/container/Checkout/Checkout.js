import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

export default class Checkout extends Component {
	constructor(props) {
		super(props)

		const query = new URLSearchParams(this.props.location.search)
		const ingredients = {}
		let price = 0

		for (let param of query.entries()) {
			if (param[0] === 'price') {
				price = param[1]
			} else {
				ingredients[param[0]] = +param[1]
			}
		}

		this.state = { ingredients: ingredients, totalPrice: price }
	}

	// state = {
	// 	ingredients: null,
	// 	totalPrice: 0,
	// }

	// componentDidMount() {}

	onCheckoutCanceled = () => {
		this.props.history.goBack()
	}

	onCheckoutContinue = () => {
		this.props.history.replace('/checkout/contact-data')
	}

	render() {
		console.log(this.state)
		return (
			<div>
				<CheckoutSummary
					ingredients={this.state.ingredients}
					checkoutCancel={this.onCheckoutCanceled}
					checkoutContinue={this.onCheckoutContinue}
				/>
				<Route
					path={`${this.props.match.path}/contact-data`}
					render={(props) => (
						<ContactData
							ingredients={this.state.ingredients}
							price={this.state.totalPrice}
							{...props}
						/>
					)}
				/>
			</div>
		)
	}
}
