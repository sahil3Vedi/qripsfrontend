import React, {Component} from 'react'
import { Menu, Button } from 'antd'
import Inventory from '../admincomps/inventory'
import './dashboard.css'
import * as actions from '../actions/auth'

class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state={
            current: "inventory"
        }
    }

    handleMenuChange = e => {
        this.setState({
            current: e.key
        })
    }

    render(){
        let display = null
        switch(this.state.current){
            case "inventory":
                display = <Inventory/>
                break
            default:
                display = null
                break
        }
        return (
            <div className="admin-panel-layout">
                <div>
                    <Menu style={{ width: 256 }} mode="inline" selectedKeys={[this.state.current]} onClick={this.handleMenuChange}>
                        <Menu.Item key="dashboard">Dashboard</Menu.Item>
                        <Menu.Item key="store">Store</Menu.Item>
                        <Menu.Item key="inventory">Inventory</Menu.Item>
                        <Menu.Item key="orders">Orders</Menu.Item>
                        <Menu.Item key="deliveries">Deliveries</Menu.Item>
                        <Menu.Item key="customers">Customers</Menu.Item>
                        <Menu.Item key="settings">Settings</Menu.Item>
                    </Menu>
                    <div style={{padding:"20px"}}>
                        <Button type="primary" onClick={()=>{actions.superLogout(this.props.setLogin)}}>Logout</Button>
                    </div>
                </div>
                <div className="admin-workspace">
                    {display}
                </div>
            </div>
        )
    }
}

export default Dashboard
