import React, { Component } from 'react'
import Layout from '../container/Layout/Layout'
import BurgerBuilder from './BurgerBuilder/BurgerBuilder'

export default class App extends Component {
	render() {
		return (
			<div>
				<Layout>
					<BurgerBuilder />
				</Layout>
			</div>
		)
	}
}
