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
        }
    }

    componentDidMount(){
        let currentLHS = "sub1"
        switch(this.props.pathname.split('/')[1]){
            case "home":
                currentLHS = "sub1"
                break
            case "products":
                currentLHS = this.props.pathname.split('/')[2]
                break
            case "help":
                currentLHS = "sub9"
                break
            case "about":
                currentLHS = "sub10"
                break
            case "legal":
                currentLHS = "sub11"
                break
            default:
                currentLHS = null
                break
        }
        this.setState({currentLHS})
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

    render(){
        return (
            <div>
                <div className={this.props.navTop ? "navbar-top navTop" : "navbar-top"}>
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
                                <Menu.Item key="plant-based-cheese"><Link to="/products/plant-based-cheese">Cheese</Link></Menu.Item>
                                <Menu.Item key="plant-based-milk"><Link to="/products/plant-based-milk">Milk</Link></Menu.Item>
                                <Menu.Item key="plant-based-buter"><Link to="/products/plant-based-butter">Butter</Link></Menu.Item>
                                <Menu.Item key="plant-based-tofu"><Link to="/products/plant-based-tofu">Tofu</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" title="Plant Based Meat">
                                <Menu.Item key="5">Frozen</Menu.Item>
                                <Menu.Item key="6">Non Frozen</Menu.Item>
                                <Menu.Item key="7">Poultry</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub4" title="Body Care">
                                <Menu.Item key="8">Hair Care</Menu.Item>
                                <Menu.Item key="9">Body Wash</Menu.Item>
                                <Menu.Item key="10">Skin Care</Menu.Item>
                                <Menu.Item key="11">Cosmetics</Menu.Item>
                                <Menu.Item key="12">Perfumes</Menu.Item>
                                <Menu.Item key="13">Hygiene</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub5" title="Nutrition">
                                <Menu.Item key="14">Bars</Menu.Item>
                                <Menu.Item key="15">Protein Powder</Menu.Item>
                                <Menu.Item key="16">Supplements</Menu.Item>
                                <Menu.Item key="17">Seeds</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub6" title="Grocery">
                                <Menu.Item key="18">Tea</Menu.Item>
                                <Menu.Item key="19">Coffee</Menu.Item>
                                <Menu.Item key="20">Oil</Menu.Item>
                                <Menu.Item key="21">Beverages</Menu.Item>
                                <Menu.Item key="22">Sauces</Menu.Item>
                                <Menu.Item key="23">Snacks</Menu.Item>
                                <Menu.Item key="24">Dry Fruits</Menu.Item>
                                <Menu.Item key="25">Sugar</Menu.Item>
                                <Menu.Item key="26">Salt</Menu.Item>
                                <Menu.Item key="27">Spices</Menu.Item>
                                <Menu.Item key="28">Cereal</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub7" title="Chocolates">
                                <Menu.Item key="29">Powder</Menu.Item>
                                <Menu.Item key="30">Sugar Free</Menu.Item>
                                <Menu.Item key="31">Bars</Menu.Item>
                                <Menu.Item key="32">Spread</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub8" title="Bakery">
                                <Menu.Item key="33">Cookies</Menu.Item>
                                <Menu.Item key="34">Biscuits</Menu.Item>
                                <Menu.Item key="35">Powder</Menu.Item>
                                <Menu.Item key="36">Butter</Menu.Item>
                                <Menu.Item key="37">Sugar</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="sub9"><Link to="/help">Help</Link></Menu.Item>
                            <Menu.Item key="sub10"><Link to="/about">About</Link></Menu.Item>
                            <Menu.Item key="sub11"><Link to="/legal">Legal</Link></Menu.Item>
                        </Menu>
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default Navbar
