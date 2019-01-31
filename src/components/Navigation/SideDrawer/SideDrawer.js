import React from 'react'
import classes from './SideDrawer.css'
import Logo from '../../Logo/Logo'
import NaviagtionItems from '../NavigationItems/NavigationItems'

const sideDrawer = () => {
    return(
        <div className={classes.SideDrawer}>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav>
                <NaviagtionItems />
            </nav>
        </div>
    )
}

export default sideDrawer