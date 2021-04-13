import React, {Component} from 'react'
import { Select } from 'antd'
import '../customercomps/home.css'

const { Option } = Select

const home_categories = [
    {color:"#FFEDBB",name:"Cheese",link:"plant-based-cheese",svgurl:'../assets/images/cheese.svg'},
    {color:"#FFEDBB",name:"Milk",link:"plant-based-cheese",svgurl:"../assets/images/cheese.svg"},
    {color:"#FFEDBB",name:"Skincare",link:"plant-based-cheese",svgurl:"../assets/images/cheese.svg"},
    {color:"#FFEDBB",name:"Beverages",link:"plant-based-cheese",svgurl:"../assets/images/cheese.svg"},
    {color:"#FFEDBB",name:"Sauces",link:"plant-based-cheese",svgurl:"../assets/images/cheese.svg"},
    {color:"#FFEDBB",name:"Dry Fruits",link:"plant-based-cheese",svgurl:"../assets/images/cheese.svg"},
    {color:"#FFEDBB",name:"Biscuits",link:"plant-based-cheese",svgurl:"../assets/images/cheese.svg"},
    {color:"#FFEDBB",name:"Tofu",link:"plant-based-cheese",svgurl:"../assets/images/cheese.svg"}
]

class Home extends Component{
    render(){
        return (
            <div>
                <div className="home-search">
                    <Select allowClear showSearch placeholder="Search from over 1000 products" optionFilterProp="children" filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} filterSort={(optionA, optionB) =>optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}>
                        <Option value="1">Not Identified</Option>
                        <Option value="2">Closed</Option>
                        <Option value="3">Communicated</Option>
                        <Option value="4">Identified</Option>
                        <Option value="5">Resolved</Option>
                        <Option value="6">Cancelled</Option>
                    </Select>
                </div>
                <div className="home-title"><p>Explore</p></div>
                <div className="home-categories">{home_categories.map(d=>
                        <div key={d.name}>
                            <div style={{backgroundColor:d.color}} className="home-category">
                                <img src={require('../assets/images/cheese.svg').default} className="home-category-image" alt="product-category"/>
                            </div>
                            <p>{d.name}</p>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Home
