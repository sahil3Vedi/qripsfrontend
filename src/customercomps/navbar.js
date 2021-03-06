import React, {Component} from 'react'
import { Drawer } from 'antd'
import { MenuOutlined, ShoppingOutlined } from '@ant-design/icons'
import './navbar.css'

class Navbar extends Component{
    constructor(props){
        super(props)
        this.state={
            LHSOpen: false,
            RHSOpen: false
        }
    }

    toggleRHS = () => {
        this.setState(prevState=>({
            RHSOpen: !prevState.RHSOpen
        }))
    }

    toggleLHS = () => {
        this.setState(prevState=>({
            LHSOpen: !prevState.LHSOpen
        }))
    }

    render(){
        return (
            <div>
                <div className="navbar-top">
                    <div><MenuOutlined style={{fontSize:"25px"}} onClick={this.toggleLHS}/></div>
                    <div><img className="navbar-logo" src={require('../assets/images/qripslogo.png').default} alt='' /></div>
                    <div><ShoppingOutlined onClick={this.toggleRHS}/></div>
                </div>
                <Drawer
                    title="Right Drawer"
                    placement="right"
                    closable={false}
                    onClose={this.toggleRHS}
                    visible={this.state.RHSOpen}
                    >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>
                <Drawer
                    title="Left Drawer"
                    placement="left"
                    closable={false}
                    onClose={this.toggleLHS}
                    visible={this.state.LHSOpen}
                    >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>
            </div>
        )
    }
}

export default Navbar
