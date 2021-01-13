import React, {Component} from "react"
import Aux from "../../higherordercomponent/auxillary"
import Burger from "../../components/Burger/burger"
import BuildControls from "../../components/Burger/BuildControls/buildcontrols"
import Modal from "../../components/UI/Modal/modal"
import OrderSummary from "../../components/Burger/OrderSummary/ordersummary"
import axios from "../../../src/axios-orders"
import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorHandler from "../../higherordercomponent/withErrorHandler/withErrorHandler"
import {connect} from "react-redux"
import * as actionTypes from "../../store/actions/actionTypes"
import * as actions from "../../store/actions/index"
 

// const INGREDIENTS_PRICE = {
//     salad:0.5,
//     cheese:0.4,
//     meat:1.3,
//     bacon:0.7
// }

class BurgerBuilder extends Component{
    
    state={
        // ingredients:null,
        // totalPrice:4,
        // purchasable: false,
        purchasing:false,
    }

    componentDidMount(){
    this.props.onInitIngredients();
        //     axios.get('/ingredients.json')
    //     .then(response=>{
    //         this.setState({ingredients:response.data})
    //     })
    //     .catch(error =>{
    //         this.setState({error:true})
    //     })
    // }
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing:true})
        }
        else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false})
    }

    purchaseConfirmationHandler = () => {
        // alert("Your order was confirmed !")
        // this.setState({loading:true})
        // const order={
        //     ingredients:this.state.ingredients,
        //     price:this.state.totalPrice,
        //     customer:{
        //         name:'Cool',
        //         address:{
        //             street:'Teststreet 1',
        //             zipCode:405060,
        //             country:"Kurkure"
        //         },
        //         email:'test@test.com'
        //     },
        //     deliveryMethod:'fastest'
        // }
        // axios.post('orders.json',order)
        // .then(response =>  this.setState({loading:false, purchasing:false}))
        // .catch(error => this.setState({loading:false, purchasing:false}));
        // const queryParams = [];
        // for (let i in this.props.ings){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
        // }
        // queryParams.push('price=' + this.props.price);
        // const queryString = queryParams.join('&')
    //     this.props.history.push({
    //         pathname: "/checkout",
    //         search:'?'+queryString});
    // }
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum,el) => {
            return sum+el;
        },0);
        return sum>0
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.props.ings[type];
    //     const updatedCount = oldCount+1;
    //     const updatedIngredients = {
    //         ...this.props.ings
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENTS_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice:newPrice, ingredients:updatedIngredients})
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.props.ings[type];
    //     if (oldCount<=0){
    //         return;
    //     }
    //     const updatedCount = oldCount-1;
    //     const updatedIngredients = {
    //         ...this.props.ings
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceSubtraction = INGREDIENTS_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceSubtraction;
    //     this.setState({totalPrice:newPrice, ingredients:updatedIngredients})
    //     this.updatePurchaseState(updatedIngredients);
    // }

    render(){
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo){
            disabledInfo[key]= disabledInfo[key]<=0
        }

        let orderSummary=null;

        

        let burger= this.props.error ? <p>Ingredients can't be loaded </p> : <Spinner/>
        if(this.props.ings){
        burger = (<Aux><Burger ingredients={this.props.ings}/>
        <BuildControls 
        // ingredientAdded={this.addIngredientHandler}
        // ingredientSubtracted={this.removeIngredientHandler}
        ingredientAdded={this.props.onIngredientAdded}
        ingredientSubtracted={this.props.onIngredientRemoved}
        disabled={disabledInfo}
        price={this.props.price}
        ordering={this.purchaseHandler}
        purchasable={this.updatePurchaseState(this.props.ings)}/></Aux>); 
        orderSummary = <OrderSummary ingredients={this.props.ings}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseConfirmed={this.purchaseConfirmationHandler}
        isAuth={this.props.isAuthenticated}
        price={this.props.price.toFixed(2)} />
    }

    // if(this.state.loading){
    //     orderSummary=<Spinner/>
    // }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                    </Modal>
                {burger}        
            </Aux>
        );
    }
}

const mapStateToProps = state =>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated:state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onIngredientAdded:(ingName)=>dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved:(ingName)=>dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () =>dispatch(actions.initIngredients()),
        onInitPurchase: () =>dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) =>dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));