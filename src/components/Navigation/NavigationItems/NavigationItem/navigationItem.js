import React from "react"
import classes from "../NavigationItem/navigationItem.module.css"
import {NavLink} from "react-router-dom"

const navigationItem = (props) =>(
    <ul>
        <li className={classes.NavigationItem}>
            <NavLink
             to={props.link} exact
             activeClassName={classes.active}>
                 {props.children}
             </NavLink>
            </li>
    </ul>
);

export default navigationItem;