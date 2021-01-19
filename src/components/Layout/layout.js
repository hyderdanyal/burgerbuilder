import React, { useState } from "react";
import Aux from "../../higherordercomponent/auxillary"
import classes from "../Layout/layout.module.css"
import Toolbar from "../Navigation/Toolbar/Toolbar"
import SideDrawers from "../Navigation/SideDrawers/SideDrawers" 
import {connect} from 'react-redux'

const Layout = props =>{
    
    const [showSideDrawer,setShowSideDrawer] = useState(false);
    // state={
    //     showSideDrawer:false
    // }   

    const sideDrawerClosedHandler = () =>{
        setShowSideDrawer(true);
        // this.setState({showSideDrawer:true})

    }

    const sideDrawerToggleHandler = () =>{
        setShowSideDrawer(!showSideDrawer);
        // this.setState((prevState) => {
        //     return {showSideDrawer: !prevState.showSideDrawer}
        // })
    }

    // render(){
    return(
    <Aux>
        <Toolbar 
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler}/>
        <SideDrawers open={showSideDrawer} closed={sideDrawerClosedHandler}/>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
    );
// }
}

const mapStateToProps=state=>{
    return{
        isAuthenticated:state.auth.token !==null
    }
}

export default connect(mapStateToProps)(Layout);
