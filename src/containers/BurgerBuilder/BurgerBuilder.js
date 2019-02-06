import React from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../hoc/axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends React.Component{

    state = {
        ingredients: null,
        totalPrice: 4 ,
        purchaseable: false, 
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount(){
        axios.get('https://react-my-burger-builder-285b6.firebaseio.com/ingredients.json')
            .then(responese => {
                this.setState({ingredients: responese.data})
            })  
            .catch(error => {
                this.setState({ error: true })
            })  
    }

    updatePurchaseState (ingredients)  {
        const sum = Object.keys(ingredients)
                .map( igKey => {
                    return ingredients[igKey]
                })
                .reduce((sum, el) => {
                    return sum + el;
                }, 0);
                this.setState({purchaseable: sum > 0})
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContiueHandler = () => {
        // alert('You Continue!')
        // this.setState({ loading: true })
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer:{
        //         name: 'bharat',
        //         address: {
        //             street: 'abddstreet',
        //             zipCode: '1234',
        //             country: 'india'
        //         },
        //     email: 'abc@abc.com',            
        //     },
        //     deliveryMethod: 'fastest',
        // }

        // axios.post('/order.json', order)
        //     .then( res => {
        //         this.setState({loading: false , purchasing: false })
        //     })
        //     .catch( error => {
        //             this.setState({loading: false, purchasing: false})
        //         })

    }

    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients ={
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {

        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients ={
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }

    render(){
        const disableInfo ={
            ...this.state.ingredients
        }
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary = null;        
        let burger = this.state.error ? <p>Ingredients can't be loaded...</p> : <Spinner />

        if(this.state.ingredients){
           burger =(
                    <Aux>                    
                        <Burger ingredients={this.state.ingredients} />
                        <BuildControls 
                            ingredientAdded={this.addIngredientHandler}
                            ingredientRemoved={this.removeIngredientHandler}
                            disabled={disableInfo} 
                            purchaseable={this.state.purchaseable} 
                            ordered = {this.purchaseHandler}
                            price = {this.state.totalPrice}                      
                            />
                    </Aux>
            );
            orderSummary =  
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice.toFixed(2)} 
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

export default withErrorHandler(BurgerBuilder, axios )