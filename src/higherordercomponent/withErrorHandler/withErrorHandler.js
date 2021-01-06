import React, { Component } from "react"
import Modal from "../../components/UI/Modal/modal"
import Aux from "../auxillary"

const withErrorHandler=(WrappedComponent,axios) =>{
    return class extends Component {
        state={
            error:null
        }

        componentWillMount(){
            this.reqInterceptors = axios.interceptors.request.use(req =>{
                this.setState({error:null})
                return req;
            })
            this.resInterceptors = axios.interceptors.response.use(res =>res ,error => {
                this.setState({error})
            })
        }

        componentWillUnmount(){
            // console.log("WIll unmount" , this.reqInterceptors, this.resInterceptors)
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }

        errorConfirmedHandler = () =>{
            this.setState({error:null})
        }

        render(){
        return(
            <Aux>
                <Modal show={this.state.error}
                modalClosed={this.errorConfirmedHandler}>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props} />
            </Aux>
        )
    }
}
}
export default withErrorHandler;