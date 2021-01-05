import React from "react"
import classes from "../DrawerToggle/DrawerToggle.module.css"

const DrawerToggle = (props) =>(
    <div className={classes.DrawerToggle} onClick={console.log("kuchh",props.clicked)}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default DrawerToggle;