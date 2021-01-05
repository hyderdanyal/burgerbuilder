import React from "react";
import Layout from "../src/components/Layout/layout"
import BurgerBuilder from "../src/containers/BurgerBuilder/burgerbuilder"

function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder/>
      </Layout>  
    </div>
  );
}

export default App;
