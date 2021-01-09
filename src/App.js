import React, { Component } from "react";
import Layout from "../src/components/Layout/layout"
import BurgerBuilder from "../src/containers/BurgerBuilder/burgerbuilder"
import Checkout from "../src/containers/Checkout/Checkout"
import Orders from "../src/containers/Orders/Orders"
import {Route} from "react-router-dom"

class App extends Component {
  // state= {
  //   show:true
  // }

  // componentDidMount(){
  //   setTimeout(() => {
  //     this.setState({show:false})
  //   },5000);
  // }

  render(){
  return (
    <div>
      <Layout>
        {/* {this.state.show ? <BurgerBuilder/> : null} */}
        <Route path="/checkout" component={Checkout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/orders" exact component={Orders} />
      </Layout>  
    </div>
  );
}
}

export default App;
