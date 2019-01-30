import React from 'react'

import classes from './Burger.css'
import BurgerIntgredient from './BurgerIngredient/BurgerIngredient';


const burger = (props) => {
    // const transformedIngredient = Object.keys(props.ingredients)
    return(
        <div className={classes.Burger}>
            <BurgerIntgredient type="bread-top" />
            <BurgerIntgredient type="cheese" />
            <BurgerIntgredient type="meat" />
            <BurgerIntgredient type="bread-bottom" />

        </div>
    )
}

export default burger;