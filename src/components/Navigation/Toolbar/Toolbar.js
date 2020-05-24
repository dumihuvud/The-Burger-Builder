import React from 'react'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import Logo from '../../Logo/Logo'
import classes from './Toolbar.module.css'
import NavigationItems from '../NavigationItems/NavigationItems'

const toolbar = (props) => {
	return (
		<header className={classes.Toolbar}>
			<DrawerToggle clicked={props.drawerToggleClicked} />
			<div className={classes.Logo}>
				<Logo />
			</div>
			<nav className={classes.DesktopOnly}>
				<NavigationItems />
			</nav>
		</header>
	)
}

export default toolbar
