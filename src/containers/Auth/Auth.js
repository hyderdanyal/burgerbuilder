import React,{Component} from "react"
import Input from "../../components/UI/Input/Input"
import Button from "../../components/UI/Buttons/buttons"
import classes from "../Auth/Auth.module.css"
import * as actions from "../../store/actions/index"
import {connect} from 'react-redux'
import Spinner from "../../components/UI/Spinner/Spinner"
import {Redirect} from "react-router-dom"
import {checkValidity} from "../../shared/validation"

class Auth extends Component{
    
    state={
        controls:{
            email:{
                elementType: 'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email'
                 },
                 value:'',
                 validation:{
                     required:true,
                     isEmail:true
                 },
                 valid:false,
                 touched:false
                 
            },
            password:{
                elementType: 'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Your Password'
                 },
                 value:'',
                 validation:{
                     required:true,
                     minLength:6
                 },
                 valid:false,
                 touched:false
                 
            },
        },
        isSignup:true
    }
    // checkValidity(value, rules){
    //     let isValid = true;

    //     if(rules.required){
    //         isValid = value.trim() !== '' && isValid;
    //     }
    //     if(rules.minLength){
    //         isValid = value.length >= rules.minLength && isValid
    //     }
    //     if(rules.isNumeric){
    //         const pattern = /^\d+$/;
    //         isValid=pattern.test(value) && isValid;
    //     }
    //     if(rules.isEmail){
    //         const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/
    //         isValid=pattern.test(value) && isValid;
    //     }
    //     return isValid;
    // }

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath !=='/'){
            this.props.onSetAuthRedirectPath()
        }
    }

    inputChangedHandler = (event, controlName) =>{
        const updatedControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event.target.value,
                valid:checkValidity(event.target.value, this.state.controls[controlName].validation),
                    touched:true
            }
        }
        this.setState({controls:updatedControls})
    }

    submitHandler = (event) =>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup)
    }

    switchAuthModeHandler = () =>{
        this.setState(prevState =>{
            return { isSignup:!prevState.isSignup}
        })
    }

    render(){
        const formElementsArray = [];
        for(let key in this.state.controls){
            formElementsArray.push({
                id:key,
                config:this.state.controls[key]
            })
        }
        let form = formElementsArray.map(formElement =>{
            return(
            <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value} 
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event)=>this.inputChangedHandler(event,formElement.id)} />)
        });

        if(this.props.loading){
            form = <Spinner/>
        }

        let errorMessage=null;

        if(this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect=null;
        if(this.props.isAuthenticated){
            authRedirect=<Redirect to={this.props.authRedirectPath} />
        }

        return(
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success"> Submit </Button>
                    </form>
                    <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">Switch TO {this.state.isSignup ? "SIGN IN" : "SIGN UP"}</Button>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token !== null,
        buildingBurger:state.burgerBuilder.building,
        authRedirectPath:state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onAuth: (email,password,isSignup) =>dispatch(actions.auth(email,password,isSignup)),
        onSetAuthRedirectPath: ()=> dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);