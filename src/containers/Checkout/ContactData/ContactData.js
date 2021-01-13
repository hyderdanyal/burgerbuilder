import React,{Component} from "react";
import Button from "../../../components/UI/Buttons/buttons";
import classes from "../ContactData/ContactData.module.css";
import axios from "../../../axios-orders"
import Spinner from "../../../components/UI/Spinner/Spinner"
import Input from "../../../components/UI/Input/Input"
import {connect} from "react-redux"
import withErrorHandler from "../../../higherordercomponent/withErrorHandler/withErrorHandler"
import * as actions from "../../../store/actions/index"

class ContactData extends Component{
    state={
        orderForm:{
                name:{
                    elementType: 'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Name'
                     },
                     value:'',
                     validation:{
                         required:true,
                         minLength:5
                     },
                     valid:false,
                     touched:false
                     
                },
                    street:{
                        elementType: 'input',
                        elementConfig:{
                            type:'text',
                            placeholder:'Street'
                        },
                        value:'',
                        validation:{
                            required:true
                        },
                        valid:false,
                        touched:false
                    },
                    zipCode:{
                        elementType: 'input',
                        elementConfig:{
                            type:'text',
                            placeholder:'Zipcode'
                        },
                        value:'',
                        validation:{
                            required:true
                        },
                        valid:false,
                        touched:false
                    },
                    country:{
                        elementType: 'input',
                        elementConfig:{
                            type:'text',
                            placeholder:'Your Country'
                        },
                        value:'',
                        validation:{
                            required:true
                        },
                        valid:false,
                        touched:false
                    },
                    email:{
                        elementType: 'input',
                        elementConfig:{
                            type:'email',
                            placeholder:'Your E-Mail'
                        },
                        value:'',
                        validation:{
                            required:true,
                        
                        },
                        valid:false,
                        touched:false
                    },
                    deliveryMethod:{
                        elementType: 'select',
                        elementConfig:{
                            options:[
                                {value:'fastest', displayValue:'Fastest'},
                                {value:'cheapest', displayValue:'Cheapest'}
                            ]
                        },
                        value:'fastest',
                        valid:true,
                        validation:{}
                    }
        },
    
        formIsValid:false
    }

    orderHandler=(event)=>{
        event.preventDefault();
        
        
        const formData ={};
        for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order={
            ingredients:this.props.ings,
            price:this.props.price,
            orderData: formData,
            userId:this.props.userId
        }
        this.props.onOrderBurger(order,this.props.token);
        // console.log("Axios post",order)
        // axios.post('orders.json',order)
        // .then(response =>  {
        //     console.log("response",response)
        //     this.setState({loading:false})
        //     this.props.history.push("/")
        // })
        // .catch(error => {
        //     console.log("error",error)
        //     this.setState({loading:false}
        //         )});
        // alert("Your order was confirmed !")
        
    }

    inputChangedHandler = (event,inputIdentifier) =>{
        const updatedOrderForm={
            ...this.state.orderForm
        }
        const updatedFormElement={
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value=event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement
        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm:updatedOrderForm,formIsValid})
    }

    checkValidity(value, rules){
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }
        if(rules.isNumeric){
            const pattern = /^\d+$/;
            isValid=pattern.test(value) && isValid;
        }
        if(rules.isEmail){
            const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/
            isValid=pattern.test(value) && isValid;
        }
        return isValid;
    }

    render() {
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        
        let form=(<form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement =>(
                <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value} 
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event)=>this.inputChangedHandler(event,formElement.id)}/>
            ))}
            
            <Button btnType="Success" disabled={!this.state.formIsValid} >Order</Button>
        </form>);
        if(this.props.loading){
            form = <Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact detail</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}
const mapDispatchToProps = dispatch =>{
    return{
    onOrderBurger: (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));