import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import * as actions from '../../store/actions/index'

class Checkout extends Component {
	constructor(props) {
		super(props)
		this.props.onInitPurchase()
	}

	onCheckoutCanceled = () => {
		this.props.history.goBack()
	}

	onCheckoutContinue = () => {
		this.props.history.replace('/checkout/contact-data')
	}

	render() {
		let summary = <Redirect to='/' />

		if (this.props.ings) {
			const purchasedRedirect = this.props.purchased ? (
				<Redirect to='/' />
			) : null

			summary = (
				<React.Fragment>
					{purchasedRedirect}
					<CheckoutSummary
						ingredients={this.props.ings}
						checkoutCancel={this.onCheckoutCanceled}
						checkoutContinue={this.onCheckoutContinue}
					/>
					<Route
						path={`${this.props.match.path}/contact-data`}
						component={ContactData}
					/>
				</React.Fragment>
			)
		}

		return <div>{summary}</div>
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		purchased: state.order.purchased,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onInitPurchase: () => dispatch(actions.purchaseInit()),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
