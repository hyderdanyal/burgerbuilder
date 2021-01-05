import React, { Component } from "react";
import classes from "../Modal/modal.module.css";
import Aux from "../../../higherordercomponent/auxillary"
import Backdrop from "../Backdrop/backdrop"

class Modal extends Component{
    
    shouldComponentUpdate(nextProps,nextState) {
        return nextProps.show !==this.props.show
    }

    componentWillUpdate() {
        console.log("Modal will update")
    }

    render(){
        return(
    <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
    <div className={classes.Modal}
    style={{
        transform:this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity:this.props.show ? '1' : '0'
    }}>
        {this.props.children}
    </div>
    </Aux>
        )}
}

export default Modal;