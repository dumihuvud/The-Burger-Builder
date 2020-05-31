import React, { Component } from 'react'
import { connect } from 'react-redux'

import classes from './ContactData.module.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Button from '../../../components/UI/Button/Button'
import Input from '../../../components/UI/Input/Input'
import axios from '../../../axios-orders'

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your name',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},

			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your email',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},

			Country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},

			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},

			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIP Code',
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5,
				},
				valid: false,
				touched: false,
			},

			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastests', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' },
					],
				},
				value: 'fastests',
				validation: {},
				valid: true,
			},
		},

		loading: false,
		formIsValid: false,
	}

	orderHandler = (e) => {
		e.preventDefault()
		this.setState({ loading: true })

		let formData = {}
		for (let i in this.state.orderForm) {
			formData[i] = this.state.orderForm[i].value
		}

		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			orderData: formData,
		}

		axios
			.post('/orders.json', order)
			.then((response) => {
				this.setState({ loading: false })
				this.props.history.push('/')
			})
			.catch((error) => {
				this.setState({ loading: false })
			})
	}

	inputChangedHandler = (e, inputIdentifier) => {
		// TWO WAY BIDING FOR FORM

		// Deep cloning state. But state has nested structure, so its not enough.
		const updatedOrderForm = {
			...this.state.orderForm,
		}
		// Deep cloning nested obj
		const updatedFormElement = {
			...updatedOrderForm[inputIdentifier],
		}

		updatedFormElement.value = e.target.value
		updatedFormElement.valid = this.checkValidity(
			updatedFormElement.value,
			updatedFormElement.validation
		)
		updatedFormElement.touched = true
		updatedOrderForm[inputIdentifier] = updatedFormElement

		let formIsValid = true
		for (let i in updatedOrderForm) {
			formIsValid = updatedOrderForm[i].valid && formIsValid
		}

		this.setState({
			orderForm: updatedOrderForm,
			formIsValid: formIsValid,
		})
	}

	checkValidity(value, rules) {
		let isValid = true

		if (rules.required) {
			isValid = value.trim() !== '' && isValid
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.minLength && isValid
		}

		return isValid
	}

	render() {
		let formElemArr = []
		for (let i in this.state.orderForm) {
			formElemArr.push({
				id: i,
				config: this.state.orderForm[i],
			})
		}

		let form = (
			<form onSubmit={this.orderHandler}>
				{formElemArr.map((el) => {
					return (
						<Input
							key={el.id}
							elementType={el.config.elementType}
							elementConfig={el.config.elementConfig}
							changed={(e) => this.inputChangedHandler(e, el.id)}
							value={el.config.value}
							invalid={!el.config.valid}
							shouldValidate={el.config.validation}
							touched={el.config.touched}
						/>
					)
				})}
				<Button btnType='Success' disabled={!this.state.formIsValid}>
					Order
				</Button>
			</form>
		)

		if (this.state.loading === true) {
			form = <Spinner />
		}

		return (
			<div className={classes.ContactData}>
				<h4>Enter your contact data</h4>
				{form}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		igns: state.ingredients,
		proce: state.totalPrice,
	}
}

export default connect(mapStateToProps)(ContactData)
