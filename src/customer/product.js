import React, {Component} from 'react'
import { Button, BackTop, Modal, Checkbox, Slider, message, Row, Col } from 'antd'
import { FilterOutlined, CloseCircleOutlined } from '@ant-design/icons'
import Spinner from '../customercomps/spinner'
import Item from '../customercomps/item'
import '../customercomps/item.css'
import '../customercomps/product.css'
import axios from 'axios'

const categoryMap = {
    "plant-based-cheese":["Blocks","Shredded","Slices","Dips"]
}

function inferCategory(pathname){
    let arr = pathname.split("-")
    let capitalised = arr.map(d=>d.charAt(0).toUpperCase() + d.slice(1))
    let retstr = ""
    for (var w in capitalised){
        retstr += (capitalised[w] + " ")
    }
    return retstr
}

function fetchCategories(pathname){
    return categoryMap[pathname]
}

class Product extends Component{

    constructor(props){
        super(props)
        this.state={
            pathname : props.pathname,
            loading: true,
            products: [],
            filteredProducts: [],
            filterVisible: false,
            minFilterPrice: 100,
            maxFilterPrice: 1500,
            companies: [],
            filterCompanies: [],
            categories: [],
            filterCategories: [],
        }
    }

    componentDidMount(){
        var heading = inferCategory(this.state.pathname.split('/')[2])
        var categories = fetchCategories(this.state.pathname.split('/')[2])
        console.log(this.state.pathname.split('/')[2])
        axios.get(`${process.env.REACT_APP_BACKEND}/products/fetch/${this.state.pathname.split('/')[2]}`)
        .then(res=>{
            let companies = res.data.map(d=>d.shop_company).filter((v, i, a) => a.indexOf(v) === i)
            this.setState({
                products: res.data,
                filteredProducts: res.data,
                loading: false,
                heading: heading,
                companies: companies,
                categories: categories ? categories : []
            })
        })
    }

    toggleFilterVisible = () => {
        this.setState(prevState=>({
            filterVisible: !prevState.filterVisible
        }))
    }

    handleFilterPrice = (value) => {
        this.setState({
            minFilterPrice: value[0],
            maxFilterPrice: value[1]
        })
    }

    handleFilterCompany = (values) => {
        this.setState({
            filterCompanies: values
        })
    }

    handleFilterCategory = (values) => {
        this.setState({
            filterCategories: values
        })
    }

    applyFilter = () => {
        let temp_products = []
        for (var product in this.state.products){
            let productInstance = this.state.products[product]
            //apply price filter & comapnies filter & product type filter
            if ((productInstance.shop_price>=this.state.minFilterPrice) && (productInstance.shop_price<=this.state.maxFilterPrice) && (this.state.filterCompanies.includes(productInstance.shop_company) || !this.state.filterCompanies.length) && (this.state.filterCategories.some(i=>productInstance.tags.includes(i)) || !this.state.filterCategories.length) ){
                temp_products.push(productInstance)
            }
        }
        this.setState({
            filteredProducts: temp_products
        },()=>{
            this.toggleFilterVisible()
            message.success("Filter Applied")
        })
    }

    clearFilter = () => {
        this.setState({
            filteredProducts: this.state.products
        },()=>{
            message.success("Filter Removed")
        })
    }

    render(){
        let filter_modal = <Modal centered header={null} closable={false} visible={this.state.filterVisible} onOk={this.applyFilter} onCancel={this.toggleFilterVisible} okText="Apply Filter">
            {
                this.state.categories.length ?
                <div>
                    <p className="filter-category">Product Type</p>
                    <Checkbox.Group style={{ width: '100%' }} onChange={this.handleFilterCategory}>
                        {this.state.categories.map(d=><Row key={d}><Col><Checkbox value={d.toLowerCase()}>{d}</Checkbox></Col></Row>)}
                    </Checkbox.Group>
                </div>
                :
                null
            }
            <p className="filter-category">Company</p>
            <Checkbox.Group style={{ width: '100%' }} onChange={this.handleFilterCompany}>
                {this.state.companies.map(d=><Row key={d}><Col><Checkbox value={d}>{d}</Checkbox></Col></Row>)}
            </Checkbox.Group>
            <p className="filter-category">Price Range</p>
            <Slider range step={100} defaultValue={[100, 1500]} min={100} max={1500} onChange={this.handleFilterPrice} tipFormatter={(value)=>`₹ ${value}`}/>
        </Modal>
        let items = this.state.filteredProducts.map(p=><Item data={p} key={p.supplier_name}/>)
        return (
            <div>
                {
                    this.state.loading ?
                    null
                    :
                    <div className="product-category-title">
                        {filter_modal}
                        <p>{this.state.heading}</p>
                        {
                            this.state.products.length ?
                            <div className="div-btn-filter">
                                <div><Button className="btn-filter" icon={<FilterOutlined />} onClick={this.toggleFilterVisible}>Filter</Button></div>
                                <div></div>
                                <div>{this.state.products.length!==this.state.filteredProducts.length ? <Button className="btn-filter" icon={<CloseCircleOutlined />} onClick={this.clearFilter}>Clear Filter</Button> : null}</div>
                            </div>
                            :
                            null
                        }
                    </div>
                }
                {
                    this.state.loading ?
                    <Spinner tip="Loading..."/>
                    :
                    <div>
                        <BackTop />
                        <div className="item-grid">
                            {items}
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default Product
