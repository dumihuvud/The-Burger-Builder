import React from 'react'
import classes from './Input.module.css'

const input = (props) => {
	// props ={ type,name,placeholder

	let inputElem = null
	const inputClasses = [classes.InputElem]
	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push(classes.Invalid)
	}

	switch (props.elementType) {
		case 'input':
			inputElem = (
				<input
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			)
			break

		case 'textarea':
			inputElem = (
				<textarea
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			)
			break

		case 'select':
			inputElem = (
				<select
					className={inputClasses.join(' ')}
					value={props.value}
					onChange={props.changed}
				>
					{props.elementConfig.options.map((el) => {
						return (
							<option key={el.value} value={el.value}>
								{el.displayValue}
							</option>
						)
					})}
				</select>
			)
			break

		default:
			inputElem = (
				<input
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			)
	}

	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElem}
		</div>
	)
}

export default input
