import React, { Component } from "react";
import Aux from "../../higherordercomponent/auxillary"
import classes from "../Layout/layout.module.css"
import Toolbar from "../Navigation/Toolbar/Toolbar"
import SideDrawers from "../Navigation/SideDrawers/SideDrawers" 

class layout extends Component{
    
    state={
        showSideDrawer:false
    }   

    sideDrawerClosedHandler = () =>{
        this.setState({showSideDrawer:true})
    }

    sideDrawerToggleHandler = () =>{
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render(){
    return(
    <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawers open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
        <main className={classes.Content}>
            {this.props.children}
        </main>
    </Aux>
    );
}}

export default layout;
