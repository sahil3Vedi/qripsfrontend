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
        },()=>{
            this.toggleLHS()
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
                            <Menu.Item key="sub1"><Link to="/home">Home</Link></Menu.Item>
                            <SubMenu key="sub2" title="Plant Based Dairy">
                                <Menu.Item key="1">Oil</Menu.Item>
                                <Menu.Item key="2">Gummies</Menu.Item>
                                <Menu.Item key="3">Capsules</Menu.Item>
                                <Menu.Item key="4">Balms</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" title="Plant Based Meat">
                                <Menu.Item key="5">Glass</Menu.Item>
                                <Menu.Item key="6">Acyllic</Menu.Item>
                                <Menu.Item key="7">Silicone</Menu.Item>
                                <Menu.Item key="8">Ceramic</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub4" title="Body Care">
                                <Menu.Item key="9">Wooden</Menu.Item>
                                <Menu.Item key="10">Glass</Menu.Item>
                                <Menu.Item key="11">Silicone</Menu.Item>
                                <Menu.Item key="12">Ceramic</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub5" title="Nutrition">
                                <Menu.Item key="13">Standard</Menu.Item>
                                <Menu.Item key="14">Flavoured</Menu.Item>
                                <Menu.Item key="15">Cones</Menu.Item>
                                <Menu.Item key="16">Roaches</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub6" title="Grocery">
                                <Menu.Item key="17">Metal</Menu.Item>
                                <Menu.Item key="18">Wooden</Menu.Item>
                                <Menu.Item key="19">Acryllic</Menu.Item>
                                <Menu.Item key="20">Stone</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub7" title="Chocolates">
                                <Menu.Item key="21">Metal</Menu.Item>
                                <Menu.Item key="22">Wooden</Menu.Item>
                                <Menu.Item key="23">Glass</Menu.Item>
                                <Menu.Item key="24">Ceramic</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub8" title="Accessories">
                                <Menu.Item key="25">Lighters</Menu.Item>
                                <Menu.Item key="26">Bowls</Menu.Item>
                                <Menu.Item key="27">Boxes</Menu.Item>
                                <Menu.Item key="28">Cleaning</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub9" title="Utilities">
                                <Menu.Item key="29">Tops</Menu.Item>
                                <Menu.Item key="30">Shorts</Menu.Item>
                                <Menu.Item key="31">Drip</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="sub10">About</Menu.Item>
                            <Menu.Item key="sub11">Help</Menu.Item>
                            <Menu.Item key="sub12">About</Menu.Item>
                            <Menu.Item key="sub13">Legal</Menu.Item>
                        </Menu>
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default Navbar
