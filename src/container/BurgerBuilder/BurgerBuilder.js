import React, { Component } from 'react'
import axios from '../../axios-orders'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
}

class BurgerBuilder extends Component {
	constructor(props) {
		super(props)

		this.state = {
			ingredients: null,
			totalPrice: 4,
			purchasable: false,
			purchasing: false,
			loading: false,
			error: false,
		}
	}

	async componentDidMount() {
		try {
			const res = await axios.get(
				'https://my-burger-builder-901d7.firebaseio.com/ingredients.json'
			)
			this.setState({ ingredients: res.data })
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

		this.setState({ purchasable: sum > 0 })
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

	purchaseHandler = () => {
		this.setState({ purchasing: true })
	}

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false })
	}

	purchaseContinueHandler = async () => {
		// alert('You continue')

		this.setState({ loading: true })

		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: 'Eugene Ganshin',
				address: 'Test',
				email: 'email@gmail.com',
			},
		}

		axios
			.post('/orders.json', order)
			.then((response) => {
				this.setState({ loading: false, purchasing: false })
			})
			.catch((error) => {
				this.setState({ loading: false, purchasing: false })
			})
	}

	render() {
		const disabledInfo = {
			...this.state.ingredients,
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

		if (this.state.ingredients) {
			burger = (
				<React.Fragment>
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

			orderSummary = (
				<OrderSummary
					price={this.state.totalPrice}
					purchaseCancel={this.purchaseCancelHandler}
					purchaseContinue={this.purchaseContinueHandler}
					ingredients={this.state.ingredients}
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

export default withErrorHandler(BurgerBuilder, axios)
