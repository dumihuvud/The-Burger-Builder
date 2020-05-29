import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Layout from '../container/Layout/Layout'
import BurgerBuilder from './BurgerBuilder/BurgerBuilder'
import Checkout from './Checkout/Checkout'

export default class App extends Component {
	render() {
		return (
			<div>
				<Layout>
					<Switch>
						<Route path='/checkout' component={Checkout} />
						<Route path='/' exact component={BurgerBuilder} />
					</Switch>
				</Layout>
			</div>
		)
	}
}
