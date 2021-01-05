import React from "react"
import classes from "../NavigationItems/NavigationItems.module.css"
import NavigationItem from "../NavigationItems/NavigationItem/navigationItem"

const navigationItems = () =>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>Burger Builder</NavigationItem>
        <NavigationItem link="/">Checkout</NavigationItem>
    </ul>
);

export default navigationItems;