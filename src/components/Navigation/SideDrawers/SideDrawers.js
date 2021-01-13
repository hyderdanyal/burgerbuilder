import React from "react"
import NavigationItems from "../NavigationItems/NavigationItems"
import Logo from "../../Logo/Logo"
import classes from "../SideDrawers/sideDrawers.module.css"
import Aux from "../../../higherordercomponent/auxillary"
import Backdrop from "../../UI/Backdrop/backdrop"

// const sideDrawers = (props) => {
    const sideDrawers = (props) => {
        let attachedClasses = [classes.SideDrawers, classes.Close]
        if(props.open){
            attachedClasses = [classes.SideDrawers, classes.Open]
        }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
            <div className={classes.Logo}>
                <Logo/>
                {/* <Logo height="11%"/> */}
            </div>
        <nav>
            <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
        </div>
        </Aux>
    )
} 
export default sideDrawers;