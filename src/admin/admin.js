import React, {Component} from 'react'
import AdminLogin from './login'
import Dashboard from './dashboard'
import * as actions from '../actions/auth'

class Admin extends Component{
    constructor(props){
        super(props)
        this.state={
            loggedIn: false
        }
    }

    componentDidMount = () => {
        actions.authCheckSuperState(this.setLogin)
    }

    setLogin = (value) => {
        this.setState({loggedIn: value})
    }

    render(){
        let admin = <AdminLogin setLogin={this.setLogin}/>
        let dashboard = <Dashboard setLogin={this.setLogin}/>
        return (
            <div>
                {this.state.loggedIn ? dashboard : admin}
            </div>
        )
    }
}

export default Admin
