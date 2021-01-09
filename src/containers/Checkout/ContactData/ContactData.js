import React,{Component} from "react";
import Button from "../../../components/UI/Buttons/buttons";
import classes from "../ContactData/ContactData.module.css";
import axios from "../../../axios-orders"
import Spinner from "../../../components/UI/Spinner/Spinner"

class ContactData extends Component{
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        },
        loading:false
    }

    orderHandler=(event)=>{
        event.preventDefault();
    
        this.setState({loading:true})
        const order={
            ingredients:this.props.ingredients,
            price:this.props.price,
            customer:{
                name:'Cool',
                address:{
                    street:'Teststreet 1',
                    zipCode:405060,
                    country:"Kurkure"
                },
                email:'test@test.com'
            },
            deliveryMethod:'fastest'
        }
        console.log("Axios post",order)
        axios.post('orders.json',order)
        .then(response =>  {
            console.log("response",response)
            this.setState({loading:false})
            this.props.history.push("/")
        })
        .catch(error => {
            console.log("error",error)
            this.setState({loading:false}
                )});
        alert("Your order was confirmed !")
        
    }

    render() {
        let form=(<form>
            <input type="text" className={classes.Input} name="name" placeholder="Your Name" />
            <input type="email" className={classes.Input} name="email" placeholder="Your Email" />
            <input type="text" className={classes.Input} name="street" placeholder="Street Address" />
            <input type="text" className={classes.Input} name="postal" placeholder="Postal Code" />
            <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
        </form>);
        if(this.state.loading){
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
export default ContactData;