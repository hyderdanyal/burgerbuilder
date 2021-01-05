import React, { Component } from "react"
import Aux from "../../../higherordercomponent/auxillary"
import Button from "../../UI/Buttons/buttons"

class orderSummary extends Component{
    
    componentWillUpdate(){
        console.log("OrderSummary will update")
    }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map((igKey) => {
            return <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>
        } )
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>Your burger has:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {this.props.price}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Success" clicked={this.props.purchaseConfirmed}>CONFIRM</Button>
            <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
        </Aux>
    )
    }
}

export default orderSummary