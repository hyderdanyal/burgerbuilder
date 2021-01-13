import React,{Component} from 'react';
import Order from "../../components/UI/Order/Order"
import axios from "../../axios-orders"
import withErrorHandler from "../../higherordercomponent/withErrorHandler/withErrorHandler"
import * as actions from "../../store/actions/index"
import {connect} from "react-redux"
import Spinner from "../../components/UI/Spinner/Spinner"

class Orders extends Component{
    
    // state={
    //     orders:[],
    //     loading:true
    // }
    componentDidMount(){
        this.props.onFetchOrders(this.props.token,this.props.userId)
        // axios.get("/orders.json")
        // .then(res => {
        //     const fetchedOrders =[];
        //     for(let key in res.data){
        //         fetchedOrders.push({...res.data[key],id:key})
        //     }
        //     this.setState({loading:false,orders:fetchedOrders})
        // })
        // .catch(err =>{
        //     this.setState({loading:false})
        // })
    }
    render(){
        let orders=<Spinner/>
        if(!this.props.loading){
            orders=this.props.orders.map((order)=>(
                    <Order key={order.id} 
                    ingredients={order.ingredients}
                    price={order.price}/>
                ))
        }
        return(
            <div>
                {orders}
            </div>
        );
    }
}

const MapStateToProps = state =>{
    return{
        orders:state.order.orders,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onFetchOrders: (token,userId) =>dispatch(actions.fetchOrders(token,userId))
    }
}

export default connect(MapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));