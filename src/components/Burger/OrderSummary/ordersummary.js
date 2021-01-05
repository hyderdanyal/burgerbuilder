import React from "react"
import Aux from "../../../higherordercomponent/auxillary"
import Button from "../../UI/Buttons/buttons"

const orderSummary = (props) =>{
    const ingredientSummary = Object.keys(props.ingredients)
    .map((igKey) => {
        return <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
            </li>
    } )
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>Your burger has:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Success" clicked={props.purchaseConfirmed}>CONFIRM</Button>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
        </Aux>
    )

}

export default orderSummary