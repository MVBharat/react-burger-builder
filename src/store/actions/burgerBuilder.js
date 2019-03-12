import * as actionTypes from './actionTypes';
import axios from '../../hoc/axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = (ingredients) => {
    return{
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientFailed = () => {
    return{
        type: actionTypes.FETCH_INGREDIENT_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {

             axios.get('https://react-my-burger-builder-285b6.firebaseio.com/ingredients.json')
            .then(responese => {
                dispatch(setIngredients(responese.data))
            })  
            .catch(error => {
                dispatch(fetchIngredientFailed())
            })  
        }
}