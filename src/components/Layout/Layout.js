import React from 'react'
import classes from '../Layout/Layout.module.css'

const Layout = (props) => {
	return (
		<React.Fragment>
			<div>toolbar,sidedraw,backdrop</div>
			<main className={classes.Content}>{props.children}</main>
		</React.Fragment>
	)
}

export default Layout
