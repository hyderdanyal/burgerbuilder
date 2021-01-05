import React from "react"
import classes from "../Toolbar/Toolbar.module.css"
import Logo from "../../Logo/Logo"
import NavigationItems from "../NavigationItems/NavigationItems"
import DrawerToggle from "../SideDrawers/DrawerToggle/DrawerToggle"

// const toolbar = (props) => (
    const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleCicked}/>
        <div className={classes.Logo}>
            <Logo/>
        {/* <Logo heigth="80%"/> */}
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
);

export default toolbar;
