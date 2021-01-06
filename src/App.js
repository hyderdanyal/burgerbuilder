import React, { Component } from "react";
import Layout from "../src/components/Layout/layout"
import BurgerBuilder from "../src/containers/BurgerBuilder/burgerbuilder"

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
        <BurgerBuilder />
      </Layout>  
    </div>
  );
}
}

export default App;
