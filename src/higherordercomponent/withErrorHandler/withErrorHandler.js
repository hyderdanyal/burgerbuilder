import React from "react"
import Modal from "../../components/UI/Modal/modal"
import Aux from "../auxillary"
import useHttpErrorHandler from "../../hooks/http-errorhandling"

const withErrorHandler=(WrappedComponent,axios) =>{
    return props => {
        const [error,clearError] = useHttpErrorHandler(axios);
        // const [error,setError] = useState(null);
        // // state={
        // //     error:null
        // // }

        // // componentWillMount(){
        //     // this.reqInterceptors = axios.interceptors.request.use(req =>{
        //         const reqInterceptors = axios.interceptors.request.use(req =>{
        //         // this.setState({error:null})
        //         setError(null);
        //         return req;
        //     })
        //     // this.resInterceptors = axios.interceptors.response.use(res =>res ,error => {
        //         const resInterceptors = axios.interceptors.response.use(
        //             res =>
        //                res
        //               ,
        //             err => {
        //         setError(err)
        //         return Promise.reject(err);
        //     })
        // // }
        // // console.log('state error', error);

        // useEffect(()=>{
        //     return ()=>{
        //         axios.interceptors.request.eject(reqInterceptors);
        //         axios.interceptors.response.eject(resInterceptors);
        //     }
        // },[reqInterceptors,resInterceptors]);
        // // componentWillUnmount(){
        // //     // console.log("WIll unmount" , this.reqInterceptors, this.resInterceptors)
        // //     axios.interceptors.request.eject(this.reqInterceptors);
        // //     axios.interceptors.response.eject(this.resInterceptors);
        // // }

        // const errorConfirmedHandler = () =>{
        //     setError(null)
        //     // this.setState({error:null})
        // }

        // render(){
        return(
            <Aux>
                <Modal show={error}
                // modalClosed={errorConfirmedHandler}>
                modalClosed={clearError}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        )
    // }
}
}
export default withErrorHandler;