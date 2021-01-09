import React from "react"

import Burger from "../../../Burger/burger"
import Button from "../../Buttons/buttons"
import classes from "../CheckoutSummary/CheckoutSummary.css"

const checkoutSummary = (props) => {
    return(
        <div className={classes.checkoutSummary}>
            <h1> We hope it tastes well</h1>
            <div style={{width:'100%',  margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button
            btnType="Danger"
            clicked={props.checkoutCancelled}>Cancel</Button>
            <Button
            btnType="Success"
            clicked={props.checkoutConfirmed}>Confirm</Button>
        </div>
    )
}
export default checkoutSummary;