import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' },
]

const BuildControls = (props) => {
	return (
		<div className={classes.BuildControls}>
			<p>
				Current price: <strong>{props.price.toFixed(2)}</strong>
			</p>
			{controls.map((el) => (
				<BuildControl
					add={() => props.addIngredient(el.type)}
					remove={() => props.removeIngredient(el.type)}
					key={el.label}
					label={el.label}
					disabled={props.disabled[el.type]}
				/>
			))}
			<button
				className={classes.OrderButton}
				disabled={!props.purchasable}
				onClick={props.order}
			>
				ORDER NOW
			</button>
		</div>
	)
}

export default BuildControls
