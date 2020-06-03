import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

// =====================================================//

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData,
	}
}

export const purchaseBurgerFail = (error) => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error: error,
	}
}

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BUGER_START,
	}
}

export const purchaseBurger = (orderData) => {
	return async (dispatch) => {
		try {
			dispatch(purchaseBurgerStart())
			const res = await axios.post('/orders.json', orderData)
			await dispatch(purchaseBurgerSuccess(res.data.name, orderData))
		} catch (error) {
			await dispatch(purchaseBurgerFail(error))
		}
	}
}

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT,
	}
}

// =====================================================//

export const fetchOrdersSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders,
	}
}

export const fetchOrdersFail = (error) => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		error: error,
	}
}

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START,
	}
}

export const fetchOrders = () => {
	return async (dispatch) => {
		try {
			dispatch(fetchOrdersStart())
			const fetchOrders = []
			const res = await axios.get('/orders.json')

			for (let i in res.data) {
				fetchOrders.push({ ...res.data[i], id: i })
			}

			await dispatch(fetchOrdersSuccess(fetchOrders))
		} catch (error) {
			dispatch(fetchOrdersFail(error))
			console.log(error)
		}
	}
}
