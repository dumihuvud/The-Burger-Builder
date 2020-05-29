import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.module.css'

const checkoutSummary = (props) => {
	const ingredientsSummary = Object.keys(props.ingredients).map((el) => {
		return (
			<li key={el}>
				<span style={{ textTransform: 'capitalize' }}>{el}</span>:{' '}
				{props.ingredients[el]}
			</li>
		)
	})

	return (
		<div className={classes.CheckoutSummary}>
			<h1>We hope it tastes well</h1>
			<div style={{ width: '100%', margin: 'auto' }}>
				<Burger ingredients={props.ingredients} />
			</div>
			<ul>{ingredientsSummary}</ul>
			<Button btnType='Danger' click={props.checkoutCancel}>
				Cancel
			</Button>
			<Button btnType='Success' click={props.checkoutContinue}>
				Continue
			</Button>
		</div>
	)
}
export default checkoutSummary
