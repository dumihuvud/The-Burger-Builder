import React, { Component } from 'react'

import classes from './ContactData.module.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders'

export default class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: '',
		},
		loading: false,
	}

	orderHandler = (e) => {
		e.preventDefault()
		this.setState({ loading: true })
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'Eugene Ganshin',
				email: 'email@gmail.com',
				address: {
					street: 'Lol',
					postalCode: '1232',
				},
			},
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

	render() {
		let form = (
			<form>
				<input type='text' name='name' placeholder='Your name' />
				<input type='email' name='email' placeholder='Your email' />
				<input type='text' name='street' placeholder='Street' />
				<input type='text' name='postal' placeholder='Postal code' />
				<Button btnType='Success' click={this.orderHandler}>
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
