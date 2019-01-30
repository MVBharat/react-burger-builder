import React from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'

class BurgerBuilder extends React.Component{

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    }
    render(){
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <p>Build controls</p>
            </Aux>
        )
    }
}

export default BurgerBuilder