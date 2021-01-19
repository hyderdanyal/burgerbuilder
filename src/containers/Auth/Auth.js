import React,{useState,useEffect} from "react"
import Input from "../../components/UI/Input/Input"
import Button from "../../components/UI/Buttons/buttons"
import classes from "../Auth/Auth.module.css"
import * as actions from "../../store/actions/index"
import {connect} from 'react-redux'
import Spinner from "../../components/UI/Spinner/Spinner"
import {Redirect} from "react-router-dom"
import {checkValidity} from "../../shared/validation"

const Auth = props =>{
    
    const [authForm, setAuthForm] = useState({
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
             
        }
    })
       const [isSignup,setIsSignup]= useState(true);
    
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

    const {buildingBurger, authRedirectPath, onSetAuthRedirectPath} = props;

    // useEffect(()=>{
    //     if(!props.buildingBurger && props.authRedirectPath !=='/'){
    //                 props.onSetAuthRedirectPath()
    //     }
    // },[])
    useEffect(()=>{
        if(!buildingBurger && authRedirectPath !=='/'){
                    onSetAuthRedirectPath()
        }
    },[buildingBurger,authRedirectPath,onSetAuthRedirectPath])
    // componentDidMount(){
    //     if(!this.props.buildingBurger && this.props.authRedirectPath !=='/'){
    //         this.props.onSetAuthRedirectPath()
    //     }
    // }

    const inputChangedHandler = (event, controlName) =>{
        const updatedControls = {
            ...authForm,
            [controlName]:{
                ...authForm[controlName],
                value:event.target.value,
                valid:checkValidity(event.target.value, authForm[controlName].validation),
                    touched:true
            }
        }
        // this.setState({controls:updatedControls})
        setAuthForm(updatedControls)
    }

    const submitHandler = (event) =>{
        event.preventDefault();
        props.onAuth(authForm.email.value,authForm.password.value,isSignup)
    }

    const switchAuthModeHandler = () =>{
        setIsSignup(!isSignup)
        
        // this.setState(prevState =>{
        //     return { isSignup:!prevState.isSignup}
        // })
    }

        const formElementsArray = [];
        for(let key in authForm){
            formElementsArray.push({
                id:key,
                config:authForm[key]
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
            changed={(event)=>inputChangedHandler(event,formElement.id)} />)
        });

        if(props.loading){
            form = <Spinner/>
        }

        let errorMessage=null;

        if(props.error){
            errorMessage = (
                <p>{props.error.message}</p>
            )
        }

        let authRedirect=null;
        if(props.isAuthenticated){
            authRedirect=<Redirect to={props.authRedirectPath} />
        }

        return(
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={submitHandler}>
                    {form}
                    <Button btnType="Success"> Submit </Button>
                    </form>
                    <Button
                    clicked={switchAuthModeHandler}
                    btnType="Danger">Switch TO {isSignup ? "SIGN IN" : "SIGN UP"}</Button>
            </div>
        )
    
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