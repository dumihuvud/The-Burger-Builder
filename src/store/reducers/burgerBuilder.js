import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utils'

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
}

const initialState = {
	ingredients: null,
	totalPrice: 4,
	error: false,
}

const addIngredient = (state, action) => {
	const updatedIngredientAdd = {
		[action.ingredientName]: state.ingredients[action.ingredientName] + 1,
	}

	const updatedIngredientsAdd = updateObject(state.ingredients, updatedIngredientAdd)

	const updatedStateAdd = {
		ingredients: updatedIngredientsAdd,
		totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
	}

	return updateObject(state, updatedStateAdd)
}

const removeIngredient = (state, action) => {
	const updatedIngredientRemove = {
		[action.ingredientName]: state.ingredients[action.ingredientName] - 1,
	}

	const updatedIngredientsRemove = updateObject(
		state.ingredients,
		updatedIngredientRemove
	)

	const updatedStateRemove = {
		ingredients: updatedIngredientsRemove,
		totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
	}

	return updateObject(state, updatedStateRemove)
}

const setIngredient = (state, action) => {
	return updateObject(state, {
		ingredients: {
			salad: action.ingredients.salad,
			bacon: action.ingredients.bacon,
			cheese: action.ingredients.cheese,
			meat: action.ingredients.meat,
		},
		totalPrice: 4,
		error: false,
	})
}

const fetchIngredientFail = (state, action) => {
	return updateObject(state, { error: true })
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENTS:
			return addIngredient(state, action)

		case actionTypes.REMOVE_INGREDIENTS:
			return removeIngredient(state, action)

		case actionTypes.SET_INGREDIENTS:
			return setIngredient(state, action)

		case actionTypes.FETCH_INGREDIENTS_FAIL:
			return fetchIngredientFail(state, action)

		default:
			return state
	}
}

export default reducer
