import React from "react"
import classes from "../NavigationItems/NavigationItems.module.css"
import NavigationItem from "../NavigationItems/NavigationItem/navigationItem"

const navigationItems = (props) =>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" >Burger Builder</NavigationItem>
        {props.isAuthenticated?
        <NavigationItem link="/orders">Orders</NavigationItem>:
        null}
        { !props.isAuthenticated ?
        <NavigationItem link="/auth">Authenticate</NavigationItem>:
        <NavigationItem link="logout">Logout</NavigationItem>}
    </ul>
);

export default navigationItems;