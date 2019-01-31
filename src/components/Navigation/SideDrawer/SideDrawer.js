import React from 'react'
import classes from './SideDrawer.css'
import Logo from '../../Logo/Logo'
import NaviagtionItems from '../NavigationItems/NavigationItems'
import Aux from '../../../hoc/Aux/Aux'
import Backdrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close]
    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open]
    }
    return(
        <Aux>
            <Backdrop
                    show={props.open} 
                    clicked={props.closed} 
            />

            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NaviagtionItems />
                </nav>
            </div>
        </Aux>    
    )
}

export default sideDrawer