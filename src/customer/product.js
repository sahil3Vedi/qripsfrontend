import React, {Component} from 'react'
import Spinner from '../customercomps/spinner'

class Product extends Component{
    constructor(props){
        super(props)
        this.state={
            pathname : props.pathname,
            loading: true
        }
    }
    render(){
        return (
            <div>
                {
                    this.state.loading ?
                    <Spinner tip="Loading..."/>
                    :
                    <p>{this.state.pathname}</p>
                }
            </div>
        )
    }
}

export default Product
