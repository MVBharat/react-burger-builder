import React from 'react';
import { connect } from 'react-redux'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../hoc/axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions'

class BurgerBuilder extends React.Component{

    state = {
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount(){
        console.log(this.props)
        // axios.get('https://react-my-burger-builder-285b6.firebaseio.com/ingredients.json')
        //     .then(responese => {
        //         this.setState({ingredients: responese.data})
        //     })  
        //     .catch(error => {
        //         this.setState({ error: true })
        //     })  
    }

    updatePurchaseState (ingredients)  {
        const sum = Object.keys(ingredients)
                .map( igKey => {
                    return ingredients[igKey]
                })
                .reduce((sum, el) => {
                    return sum + el;
                }, 0);
                return sum > 0
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContiueHandler = () => {
        this.props.history.push('/checkout');
    }
    render(){
        const disableInfo ={
            ...this.props.ings
        }
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary = null;        
        let burger = this.state.error ? <p>Ingredients can't be loaded...</p> : <Spinner />

        if(this.props.ings){
           burger =(
                    <Aux>                    
                        <Burger ingredients={this.props.ings} />
                        <BuildControls 
                            ingredientAdded={this.props.onIngredientAdded}
                            ingredientRemoved={this.props.onIngredientRemoved}
                            disabled={disableInfo} 
                            purchaseable={this.updatePurchaseState(this.props.ings)} 
                            ordered = {this.purchaseHandler}
                            price = {this.props.price}                      
                            />
                    </Aux>
            );
            orderSummary =  
                    <OrderSummary 
                        ingredients={this.props.ings}
                        price={this.props.price.toFixed(2)} 
                        purchaseCancelled = {this.purchaseCancelHandler}
                        purchaseContinued = {this.purchaseContiueHandler}
                    />
        }
    
        if(this.state.loading){
            orderSummary = <Spinner />
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                   { orderSummary }
                </Modal>
                { burger }
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return{
        ings: state.ingredients,
        price: state.totalPrice,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios ));