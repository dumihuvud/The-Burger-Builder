import React from 'react'
import classes from '../Burger/Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = (props) => {
	// Burger logic.

	// 1) Check the props and createa a components out of it.
	let ingredients = Object.keys(props.ingredients).map((el) => {
		return [...Array(props.ingredients[el])].map((_, i) => {
			return <BurgerIngredient key={el + i} type={el} />
		})
	})

	// 2) Reduce the ingredients array,
	// to check if the value is more then 0
	if (ingredients.flat().length === 0) {
		ingredients = <p>Please start adding ingredients</p>
	}

	return (
		<div className={classes.Burger}>
			<BurgerIngredient type='bread-top' />
			{ingredients}
			<BurgerIngredient type='bread-bottom' />
		</div>
	)
}

export default Burger
