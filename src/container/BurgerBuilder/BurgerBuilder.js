import React, { Component } from 'react'
import axios from '../../axios-orders'
import { connect } from 'react-redux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actionTypes from '../../store/actions'

class BurgerBuilder extends Component {
	constructor(props) {
		super(props)

		this.state = {
			purchasing: false,
			loading: false,
			error: false,
		}
	}

	async componentDidMount() {
		try {
			// console.log('lick')
			// const res = await axios.get(
			// 	'https://my-burger-builder-901d7.firebaseio.com/ingredients.json'
			// )
			// this.setState({ ingredients: res.data })
		} catch (error) {
			this.setState({ error: true })
		}
	}

	updatePurchaseState = (ingredients) => {
		// make an array out of state and reduce the amounts of ingredients
		const sum = Object.keys(ingredients)
			.map((el) => {
				return ingredients[el]
			})
			.reduce((sum, el) => {
				return sum + el
			}, 0)

		return sum > 0
	}

	purchaseHandler = () => {
		this.setState({ purchasing: true })
	}

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false })
	}

	purchaseContinueHandler = async () => {
		this.props.history.push('/checkout')
	}

	render() {
		const disabledInfo = {
			...this.props.ings,
		}

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		let orderSummary = null
		let burger = this.state.error ? (
			<p>Ingredients cant be loaded</p>
		) : (
			<Spinner />
		)

		if (this.props.ings) {
			burger = (
				<React.Fragment>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						addIngredient={this.props.onIngredientAdded}
						removeIngredient={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						price={this.props.price}
						purchasable={this.updatePurchaseState(this.props.ings)}
						order={this.purchaseHandler}
					/>
				</React.Fragment>
			)

			orderSummary = (
				<OrderSummary
					price={this.props.price}
					purchaseCancel={this.purchaseCancelHandler}
					purchaseContinue={this.purchaseContinueHandler}
					ingredients={this.props.ings}
				/>
			)
		}

		if (this.state.loading) {
			orderSummary = <Spinner />
		}

		return (
			<React.Fragment>
				<Modal
					modalClosed={this.purchaseCancelHandler}
					show={this.state.purchasing}
				>
					{orderSummary}
				</Modal>
				{burger}
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.ingredients,
		price: state.totalPrice,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingName) =>
			dispatch({
				type: actionTypes.ADD_INGREDIENTS,
				ingredientName: ingName,
			}),

		onIngredientRemoved: (ingName) =>
			dispatch({
				type: actionTypes.REMOVE_INGREDIENTS,
				ingredientName: ingName,
			}),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios))
