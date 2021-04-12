import React, {Component} from 'react'
import { Button, BackTop } from 'antd'
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

    render(){
        let items = this.state.products.map(p=><Item data={p} key={p.supplier_name}/>)
        return (
            <div>
                {
                    this.state.loading ?
                    null
                    :
                    <div className="product-category-title">
                        <p>{this.state.heading}</p>
                        <Button className="btn-filter" icon={<FilterOutlined />}>Filter</Button>
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
