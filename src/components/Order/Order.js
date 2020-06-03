import React from 'react'
import classes from './Order.module.css'

const order = (props) => {
	const ingredients = []

	for (let i in props.ingredients) {
		ingredients.push({ name: i, amount: props.ingredients[i] })
	}

	const ingredientsOutput = ingredients.map((el) => {
		return (
			<span
				style={{
					textTransform: 'capitalize',
					display: 'inline-block',
					margin: '0 8px',
					border: '1px solid #ccc',
					padding: '5px',
				}}
				key={el.name}
			>
				{el.name} ({el.amount})
			</span>
		)
	})

	return (
		<div className={classes.Order}>
			<p>Ingredients: {ingredientsOutput}</p>
			<p>
				Price: <strong>{Number.parseFloat(props.price).toFixed(2)}</strong>
			</p>
		</div>
	)
}

export default order
