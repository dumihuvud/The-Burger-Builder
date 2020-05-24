import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
}

export default class BurgerBuilder extends Component {
	constructor(props) {
		super(props)

		this.state = {
			ingredients: {
				salad: 0,
				bacon: 0,
				cheese: 0,
				meat: 0,
			},
			totalPrice: 4,
			purchasable: false,
			purchasing: false,
		}
	}

	addIngredientHandler = (type) => {
		// INGREDIENTS LOGIC ADD
		const count = this.state.ingredients[type]
		const newCount = count + 1
		const updatedIngredients = {
			...this.state.ingredients,
		}
		updatedIngredients[type] = newCount

		// PRICE LOGIC
		const priceAddition = INGREDIENT_PRICES[type]
		const oldPrice = this.state.totalPrice
		const newPrice = oldPrice + priceAddition

		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients,
		})
		this.updatePurchaseState(updatedIngredients)
	}

	removeIngredientHandler = (type) => {
		// IMGREDIENCE LOGIC REMOVE
		const count = this.state.ingredients[type]
		if (count <= 0) return
		const newCount = count - 1
		const updatedIngredients = {
			...this.state.ingredients,
		}
		updatedIngredients[type] = newCount

		// PRICE LOGIC
		const priceDeduction = INGREDIENT_PRICES[type]
		const oldPrice = this.state.totalPrice
		const newPrice = oldPrice - priceDeduction

		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients,
		})
		this.updatePurchaseState(updatedIngredients)
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

		this.setState({ purchasable: sum > 0 })
	}

	purchaseHandler = () => {
		this.setState({ purchasing: true })
	}

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false })
	}

	purchaseContinueHandler = () => {
		alert('You continue')
	}

	render() {
		const disabledInfo = {
			...this.state.ingredients,
		}
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		return (
			<React.Fragment>
				<Modal
					modalClosed={this.purchaseCancelHandler}
					show={this.state.purchasing}
				>
					<OrderSummary
						price={this.state.totalPrice}
						purchaseCancel={this.purchaseCancelHandler}
						purchaseContinue={this.purchaseContinueHandler}
						ingredients={this.state.ingredients}
					/>
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					addIngredient={this.addIngredientHandler}
					removeIngredient={this.removeIngredientHandler}
					disabled={disabledInfo}
					price={this.state.totalPrice}
					purchasable={this.state.purchasable}
					order={this.purchaseHandler}
				/>
			</React.Fragment>
		)
	}
}
