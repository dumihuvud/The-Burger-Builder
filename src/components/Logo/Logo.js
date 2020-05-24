import React from 'react'
import classes from './Logo.module.css'
import burgerLogo from '../../assets/images/burger-logo.png'

const Logo = () => {
	return (
		<div className={classes.Logo}>
			<img alt='My burger logo' src={burgerLogo} />
		</div>
	)
}

export default Logo
