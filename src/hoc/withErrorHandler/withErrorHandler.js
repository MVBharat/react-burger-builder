import React from 'react'
import Aux from '../Aux'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios ) => {    
    return class extends React.Component{
     
        state = {
            error: null
        }
        componentDidMount(){

            axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req;
            } )

            axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error })
            })
        }

        errorConfirmHandler(){
            this.setState({error: null})
        }
        render(props){
            return(
                    <Aux>
                        <Modal
                         show = {this.state.error}
                         clicked={this.errorConfirmHandler} >

                         { this.state.error ? this.props.error.message : null }

                        </Modal>
                        <WrappedComponent {...props} />
                    </Aux>
            )
        }
    }
}

export default withErrorHandler