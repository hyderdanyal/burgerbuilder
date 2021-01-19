import React, { useEffect , Suspense} from "react";
import Layout from "../src/components/Layout/layout"
import BurgerBuilder from "../src/containers/BurgerBuilder/burgerbuilder"
// import Checkout from "../src/containers/Checkout/Checkout"
// import Orders from "../src/containers/Orders/Orders"
// import Auth from "../src/containers/Auth/Auth"
import {Route,withRouter, Redirect} from "react-router-dom"
import Logout from "./containers/Auth/Logout/Logout";
import {connect} from 'react-redux'
import * as actions from "./store/actions/index"
// import asyncComponent from "./higherordercomponent/asyncComponent/asyncComponent"

const Checkout = React.lazy(() =>{
  return import("../src/containers/Checkout/Checkout")
})
const Orders = React.lazy(() =>{
  return import("../src/containers/Orders/Orders")
})
const Auth = React.lazy(() =>{
  return import("../src/containers/Auth/Auth")
})

const App =(props) => {
  const {onTryAutoSignup} = props;
  // state= {
  //   show:true
  // }

  // componentDidMount(){
  //   setTimeout(() => {
  //     this.setState({show:false})
  //   },5000);
  // }
  useEffect(()=>{
    // props.onTryAutoSignup();
    onTryAutoSignup();
  },[onTryAutoSignup])
  // componentDidMount(){
  //   this.props.onTryAutoSignup();
  // }


  // render(){
    let routes=(
      <Layout>
      {/* <Route path="/auth" exact component={asyncAuth}/> */}
      <Route path="/auth" exact render={(props)=> <Auth {...props} />}/>
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to = "/" />
      </Layout>
    );
    if(props.isAuthenticated){
      routes=(
        <Layout>
        <Route path="/checkout" render={(props)=> <Checkout {...props}/>} />
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" exact render={(props)=> <Auth {...props}/>}/>
        <Route path="/orders" exact render={(props)=> <Orders {...props}/>} />
        <Route path="/logout" exact component={Logout} />
        <Redirect to = "/" />
      </Layout>  
      );
    }
  return (
    <div>
        <Layout>
          <Suspense fallback={<p>...Loading</p>} >
           {routes}
           </Suspense>
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
// }

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
