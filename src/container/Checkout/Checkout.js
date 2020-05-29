import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

export default class Checkout extends Component {
	state = {
		ingredients: {
			salad: null,
			meat: null,
			cheese: null,
			bacon: null,
		},
	}

	componentDidMount() {
		const query = new URLSearchParams(this.props.location.search)
		const ingredients = {}
		for (let param of query.entries()) {
			ingredients[param[0]] = +param[1]
		}

		this.setState({ ingredients: ingredients })
	}

	onCheckoutCanceled = () => {
		this.props.history.goBack()
	}

	onCheckoutContinue = () => {
		this.props.history.replace('/checkout/contact-data')
	}

	render() {
		return (
			<div>
				<CheckoutSummary
					ingredients={this.state.ingredients}
					checkoutCancel={this.onCheckoutCanceled}
					checkoutContinue={this.onCheckoutContinue}
				/>
				<Route
					path={`${this.props.match.path}/contact-data`}
					component={ContactData}
				/>
			</div>
		)
	}
}
