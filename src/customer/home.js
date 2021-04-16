import React, {Component} from 'react'
import { Select } from 'antd'
import axios from 'axios'
import Item from '../customercomps/item'
import Spinner from '../customercomps/spinner'
import '../customercomps/home.css'
import '../customercomps/item.css'
import '../customercomps/product.css'

const { Option } = Select

const home_categories = [
    {color:"#FFEDBB",name:"Cheese",link:"plant-based-cheese",svgurl:'https://www.svgrepo.com/show/10289/cheese.svg'},
    {color:"#FFC6C6",name:"Sauces",link:"plant-based-cheese",svgurl:'https://www.svgrepo.com/show/244467/sauce.svg'},
    {color:"#D2E7FF",name:"Milk",link:"plant-based-milk",svgurl:'https://www.svgrepo.com/show/113426/milk-bottle.svg'},
    {color:"#FFC6C6",name:"Skincare",link:"plant-based-cheese",svgurl:'https://www.svgrepo.com/show/123846/cosmetics.svg'},
    {color:"#E8FFC6",name:"Beverages",link:"plant-based-cheese",svgurl:'https://www.svgrepo.com/show/285923/drink-soft-drink.svg'},
    {color:"#FFEDBB",name:"Unfrozen Meat",link:"plant-based-cheese",svgurl:'https://www.svgrepo.com/show/297199/sausage.svg'},
    {color:"#FFC6C6",name:"Frozen Meat",link:"plant-based-cheese",svgurl:'https://www.svgrepo.com/show/297209/meat.svg'},
    {color:"#FFEDBB",name:"Cosmetics",link:"plant-based-cheese",svgurl:'https://www.svgrepo.com/show/299829/cosmetics-ointment.svg'},
    {color:"#FFEDBB",name:"Tofu",link:"plant-based-cheese",svgurl:'https://www.svgrepo.com/show/85280/tofu.svg'},
    {color:"#E8FFC6",name:"Dry Fruits",link:"plant-based-cheese",svgurl:'https://www.svgrepo.com/show/196387/hazelnuts-almond.svg'},
    {color:"#FFEDBB",name:"Biscuits",link:"plant-based-cheese",svgurl:'https://www.svgrepo.com/show/186236/cookie.svg'},
    {color:"#D2E7FF",name:"Butter",link:"plant-based-cheese",svgurl:'https://www.svgrepo.com/show/276537/butter-butter.svg'}
]

class Home extends Component{

    constructor(props){
        super(props)
        this.state={
            featuredProducts: [],
            featureLoading: true
        }
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_BACKEND}/products/fetch/featured`)
        .then(res=>{
            this.setState({
                featuredProducts: res.data,
                featureLoading: false
            })
        })
    }

    getCategoryDiv = (d) => {
        let svgurl = d.svgurl
        return (
            <div key={d.name}>
                <div style={{backgroundColor:d.color}} className="home-category">
                    <img src={svgurl} className="home-category-image" alt="product-category"/>
                </div>
                <p>{d.name}</p>
            </div>
        )
    }

    render(){
        let featured_items = this.state.featuredProducts.map(p=><Item data={p} key={p.supplier_name}/>)
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
                <div className="home-title"><p>100% Vegan</p></div>
                <div className="home-categories">{home_categories.map(d=>
                        this.getCategoryDiv(d)
                    )}
                </div>
                <div className="home-link"><p onClick={this.props.toggleLHS}>Explore More Categories</p></div>
                <div className="home-title"><p>Offers</p></div>
                <div className="offers">
                    <div className="offer" style={{backgroundColor:"rgb(0,127,0)",boxShadow:"3px 3px 10px #00000030"}}>
                        <div className="offer-image">
                            <img src="https://www.svgrepo.com/show/195015/house-home.svg" alt="home-delivery"/>
                        </div>
                        <div className="offer-text">
                            <p>Free Home Delivery on orders above ₹999/-</p>
                        </div>
                    </div>
                </div>
                <div className="home-title"><p>Featured Products</p></div>
                {
                    this.state.featureLoading
                    ?
                    <Spinner tip="Loading..."/>
                    :
                    <div>
                        <div className="item-grid">
                            {featured_items}
                        </div>
                    </div>
                }
                <div className="home-link"><p onClick={this.props.toggleLHS}>Explore More Products</p></div>
            </div>
        )
    }
}

export default Home
