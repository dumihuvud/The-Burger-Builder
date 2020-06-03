import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const addIngredient = (name) => {
	return {
		type: actionTypes.ADD_INGREDIENTS,
		ingredientName: name,
	}
}

export const removeIngredient = (name) => {
	return {
		type: actionTypes.REMOVE_INGREDIENTS,
		ingredientName: name,
	}
}

const setIngredients = (ingredients) => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ingredients,
	}
}

const fetchIngredientsFail = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAIL,
	}
}

export const initIngredients = () => {
	return async (dispatch) => {
		try {
			const res = await axios.get(
				'https://my-burger-builder-901d7.firebaseio.com/ingredients.json'
			)
			await dispatch(setIngredients(res.data))
		} catch (error) {
			dispatch(fetchIngredientsFail())
		}
	}
}
