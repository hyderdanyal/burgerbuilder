import React from "react"
import {Route, Redirect} from "react-router-dom"
import ContactData from "../Checkout/ContactData/ContactData"

import CheckoutSummary from "../../components/UI/Order/CheckoutSummary/CheckoutSummary"
import {connect} from 'react-redux'

const Checkout= props => {
    
    // componentWillMount(){
    //     this.props.onInitPurchase();
    // }

    // state={
    //     ingredients:null,
    //     price:0
    // }

    // componentWillMount(){
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price=0;
    //     for(let param of query.entries()){
    //         //['salad','1']
    //         if(param[0]==="price"){
    //             price=param[1]
    //         }
    //         else{
    //         ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({ingredients: ingredients, totalPrice:price})
    // }

    const checkoutCancelled = () =>{
        props.history.goBack();
    }

    const checkoutConfirmed = () =>{
        props.history.replace('/checkout/contact-data');
    }

    
        let summary = <Redirect to="/" />
        if (props.ings){
        const purchasedRedirect= props.purchased ?  <Redirect to="/" /> : null
        summary=<div>
            {purchasedRedirect}
        <CheckoutSummary ingredients={props.ings}
                checkoutCancelled={checkoutCancelled}
                checkoutConfirmed={checkoutConfirmed}/>
                <Route path={props.match.path + '/contact-data'} 
                component={ContactData} />
                </div>
        }
        return summary;
    }



const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    }
}
// const mapDispatchToProps=dispatch=>{
//     return{
//         onInitPurchase: () => dispatch(actions.purchaseInit())
//     }
// }

export default connect(mapStateToProps)(Checkout);