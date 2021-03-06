import React, {Component} from 'react'
import { Drawer, Avatar, Menu } from 'antd'
import { MenuOutlined, ShoppingOutlined, UserOutlined  } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './navbar.css'

const { SubMenu } = Menu

class Navbar extends Component{
    constructor(props){
        super(props)
        this.state={
            LHSOpen: false,
            RHSOpen: false,
            currentLHS: "sub1",
            openLHS: "sub1"
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

    handleMenuClick = e => {
        this.setState({
            currentLHS: e.key,
        })
    };

    handleOpenLHS = e => {
        console.log("click",e)
        this.setState({
            openLHS: e.key
        })
    }

    render(){
        return (
            <div>
                <div className="navbar-top">
                    <div><MenuOutlined style={{fontSize:"25px"}} onClick={this.toggleLHS}/></div>
                    <div><img className="navbar-logo" src={require('../assets/images/qripslogo.png').default} alt='' /></div>
                    <div><ShoppingOutlined onClick={this.toggleRHS}/></div>
                </div>
                <Drawer placement="right" closable={false} onClose={this.toggleRHS} visible={this.state.RHSOpen}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>
                <Drawer placement="left" closable={false} onClose={this.toggleLHS} visible={this.state.LHSOpen}>
                    <div className="drawer-header">
                        <div><Avatar size="large" icon={<UserOutlined />} /></div>
                        <div>
                            <p>Hi There!</p>
                            <p><Link to="/login" onClick={this.toggleLHS}>Sign In</Link> to Qrips</p>
                        </div>
                    </div>
                    <div className="drawer-body">
                        <Menu onClick={this.handleMenuClick} style={{ width: 256 }} selectedKeys={[this.state.currentLHS]} mode="inline">
                            <Menu.Item key="sub1" onClick={this.toggleLHS}><Link to="/home">Home</Link></Menu.Item>
                            <SubMenu key="sub2" title="CBD" onClick={this.toggleLHS}>
                                <Menu.Item key="1">Option 1</Menu.Item>
                                <Menu.Item key="2">Option 2</Menu.Item>
                                <Menu.Item key="3">Option 3</Menu.Item>
                                <Menu.Item key="4">Option 4</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" title="Bongs" onClick={this.toggleLHS}>
                                <Menu.Item key="5">Option 9</Menu.Item>
                                <Menu.Item key="6">Option 10</Menu.Item>
                                <Menu.Item key="7">Option 11</Menu.Item>
                                <Menu.Item key="8">Option 12</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub4" title="Pipes" onClick={this.toggleLHS}>
                                <Menu.Item key="9">Option 9</Menu.Item>
                                <Menu.Item key="10">Option 10</Menu.Item>
                                <Menu.Item key="11">Option 11</Menu.Item>
                                <Menu.Item key="12">Option 12</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub5" title="Papers" onClick={this.toggleLHS}>
                                <Menu.Item key="13">Option 9</Menu.Item>
                                <Menu.Item key="14">Option 10</Menu.Item>
                                <Menu.Item key="15">Option 11</Menu.Item>
                                <Menu.Item key="16">Option 12</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub6" title="Grinders" onClick={this.toggleLHS}>
                                <Menu.Item key="17">Option 9</Menu.Item>
                                <Menu.Item key="18">Option 10</Menu.Item>
                                <Menu.Item key="19">Option 11</Menu.Item>
                                <Menu.Item key="20">Option 12</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub7" title="Ash Trays" onClick={this.toggleLHS}>
                                <Menu.Item key="21">Option 9</Menu.Item>
                                <Menu.Item key="22">Option 10</Menu.Item>
                                <Menu.Item key="23">Option 11</Menu.Item>
                                <Menu.Item key="24">Option 12</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub8" title="Accessories" onClick={this.toggleLHS}>
                                <Menu.Item key="25">Option 9</Menu.Item>
                                <Menu.Item key="26">Option 10</Menu.Item>
                                <Menu.Item key="27">Option 11</Menu.Item>
                                <Menu.Item key="28">Option 12</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default Navbar
