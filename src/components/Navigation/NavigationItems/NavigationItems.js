import React from "react"
import classes from "../NavigationItems/NavigationItems.module.css"
import NavigationItem from "../NavigationItems/NavigationItem/navigationItem"

const navigationItems = () =>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" >Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
);

export default navigationItems;