import React from 'react'
import Button from '../../UI/Button/Button'

const OrderSummary = (props) => {
	const ingredientsSummary = Object.keys(props.ingredients).map((el) => {
		return (
			<li key={el}>
				<span style={{ textTransform: 'capitalize' }}>{el}</span>:{' '}
				{props.ingredients[el]}
			</li>
		)
	})

	return (
		<React.Fragment>
			<h3>Your Order</h3>
			<p>A delicius burger with the following ingredients:</p>
			<ul>{ingredientsSummary}</ul>
			<p>
				<strong>Total price: {props.price.toFixed(2)}</strong>
			</p>
			<p>Continue to checkout!</p>
			<Button btnType='Danger' click={props.purchaseCancel}>
				CANCEL
			</Button>
			<Button btnType='Success' click={props.purchaseContinue}>
				CONTINUE
			</Button>
		</React.Fragment>
	)
}

export default OrderSummary
