import React from "react"
import classes from "./buildcontrols.module.css"
import BuildControl from "./BuildControl/buildcontrol"

const controls=[
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'}
]

const buildControls = (props) =>(
    <div className={classes.BuildControls}>
        <p> Current Price: <strong>{props.price.toFixed(2)} </strong></p>
        {controls.map(ctrl => (
            <BuildControl
             key={ctrl.label}
              label={ctrl.label}
            added={() => props.ingredientAdded(ctrl.type)}
            subtracted={() => props.ingredientSubtracted(ctrl.type)}
            disabled={props.disabled[ctrl.type]}/>
        ))}
        <button
         className={classes.OrderButton}
         disabled={!props.purchasable}
         onClick={props.ordering}>{props.isAuth? 'ORDER NOW' : 'SIGN UP FIRST'}</button>
    </div>
)
export default buildControls;