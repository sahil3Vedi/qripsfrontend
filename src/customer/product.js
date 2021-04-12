import React, {Component} from 'react'
import { Button, BackTop, Modal, Checkbox, Slider } from 'antd'
import { FilterOutlined } from '@ant-design/icons'
import Spinner from '../customercomps/spinner'
import Item from '../customercomps/item'
import '../customercomps/item.css'
import '../customercomps/product.css'
import axios from 'axios'

function inferCategory(pathname){
    let arr = pathname.split("-")
    let capitalised = arr.map(d=>d.charAt(0).toUpperCase() + d.slice(1))
    let retstr = ""
    for (var w in capitalised){
        retstr += (capitalised[w] + " ")
    }
    console.log(retstr)
    return retstr
}

class Product extends Component{

    constructor(props){
        super(props)
        this.state={
            pathname : props.pathname,
            loading: true,
            products: [],
            filterVisible: false
        }
    }

    componentDidMount(){
        let heading = inferCategory(this.state.pathname.split('/')[2])
        console.log(this.state.pathname.split('/')[2])
        axios.get(`${process.env.REACT_APP_BACKEND}/products/fetch/${this.state.pathname.split('/')[2]}`)
        .then(res=>{
            this.setState({
                products: res.data,
                loading: false,
                heading: heading
            })
        })
    }

    toggleFilterVisible = () => {
        this.setState(prevState=>({
            filterVisible: !prevState.filterVisible
        }))
    }

    render(){
        let filter_modal = <Modal centered header={null} closable={false} visible={this.state.filterVisible} onOk={()=>{console.log("filtering..")}} onCancel={this.toggleFilterVisible} okText="Apply Filter">
            <p className="filter-category">Product Type</p>
            <Checkbox>Blocks</Checkbox><br/>
            <Checkbox>Shredded</Checkbox><br/>
            <Checkbox>Slices</Checkbox><br/>
            <Checkbox>Dips</Checkbox><br/>
            <p className="filter-category">Company</p>
            <Checkbox>Katharos</Checkbox><br/>
            <Checkbox>Soft Spot</Checkbox><br/>
            <Checkbox>Follow Your Heart</Checkbox><br/>
            <p className="filter-category">Price Range</p>
            <Slider range step={100} defaultValue={[100, 1500]} min={100} max={1500}/>
        </Modal>
        let items = this.state.products.map(p=><Item data={p} key={p.supplier_name}/>)
        return (
            <div>
                {
                    this.state.loading ?
                    null
                    :
                    <div className="product-category-title">
                        {filter_modal}
                        <p>{this.state.heading}</p>
                        <Button className="btn-filter" icon={<FilterOutlined />} onClick={this.toggleFilterVisible}>Filter</Button>
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
