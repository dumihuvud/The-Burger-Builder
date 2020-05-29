import React, { Component } from 'react'
import classes from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button'

export default class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: '',
		},
	}
	dosome = () => {}

	render() {
		return (
			<div className={classes.ContactData}>
				<h4>Enter your contact data</h4>
				<form>
					<input type='text' name='name' placeholder='Your name' />
					<input type='email' name='email' placeholder='Your email' />
					<input type='text' name='street' placeholder='Street' />
					<input type='text' name='postal' placeholder='Postal code' />
					<Button btnType='Success' click={this.dosome}>
						Order
					</Button>
				</form>
			</div>
		)
	}
}
