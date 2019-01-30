import React from 'react'

import classes from './Burger.css'
import BurgerIntgredient from './BurgerIngredient/BurgerIngredient';


const burger = (props) => {
    let transformedIngredient = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIntgredient key={igKey + i} type={igKey} />;
            })
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
        if(transformedIngredient.length === 0){
            transformedIngredient = <p>Please start adding ingredients!</p>
        }
    return(
        <div className={classes.Burger}>
            <BurgerIntgredient type="bread-top" />
            {transformedIngredient}
            <BurgerIntgredient type="bread-bottom" />

        </div>
    )
}

export default burger;