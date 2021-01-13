import React, { Component } from "react";
import Layout from "../src/components/Layout/layout"
import BurgerBuilder from "../src/containers/BurgerBuilder/burgerbuilder"
// import Checkout from "../src/containers/Checkout/Checkout"
// import Orders from "../src/containers/Orders/Orders"
// import Auth from "../src/containers/Auth/Auth"
import {Route,withRouter, Redirect} from "react-router-dom"
import Logout from "./containers/Auth/Logout/Logout";
import {connect} from 'react-redux'
import * as actions from "./store/actions/index"
import asyncComponent from "./higherordercomponent/asyncComponent/asyncComponent"

const asyncCheckout = asyncComponent(() =>{
  return import("../src/containers/Checkout/Checkout")
})
const asyncOrders = asyncComponent(() =>{
  return import("../src/containers/Orders/Orders")
})
const asyncAuth = asyncComponent(() =>{
  return import("../src/containers/Auth/Auth")
})

class App extends Component {
  // state= {
  //   show:true
  // }

  // componentDidMount(){
  //   setTimeout(() => {
  //     this.setState({show:false})
  //   },5000);
  // }
  componentDidMount(){
    this.props.onTryAutoSignup();
  }

  render(){
    let routes=(
      <Layout>
      <Route path="/auth" exact component={asyncAuth}/>
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to = "/" />
      </Layout>
    );
    if(this.props.isAuthenticated){
      routes=(
        <Layout>
        <Route path="/checkout" component={asyncCheckout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" exact component={asyncAuth}/>
        <Route path="/orders" exact component={asyncOrders} />
        <Route path="/logout" exact component={Logout} />
        <Redirect to = "/" />
      </Layout>  
      );
    }
  return (
    <div>
        <Layout>
          {routes}
        {/* {this.state.show ? <BurgerBuilder/> : null} */}
        {/* <Route path="/checkout" component={Checkout} /> */}
        {/* <Route path="/" exact component={BurgerBuilder} /> */}
        {/* <Route path="/orders" exact component={Orders} /> */}
        {/* <Route path="/auth" exact component={Auth}/> */}
        {/* <Route path="/logout" exact component={Logout} /> */}
      </Layout>  
    </div>
  );
}
}

const mapStateToProps = state =>{
  return{
    isAuthenticated:state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onTryAutoSignup:()=> dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
