import React, {Component} from 'react'
import { Button } from 'antd'

class Item extends Component{
    componentDidMount(){
        console.log(this.props.data)
    }
    render(){
        let data = this.props.data
        return(
            <div>
                <div className="product-image-container">
                    <div className="div-product-image">
                        <div></div>
                        <div style={{backgroundColor:`${data.color}`,borderRadius:"10px 10px 0px 0px"}}></div>
                    </div>
                    <div className="div-product-image-overlay"><img className="product-image" src={data.supplier_images[0]}/></div>
                </div>
                <div style={{backgroundColor:`${data.color}`}} className="product">
                    <p className="item-subtitle">{data.shop_company}</p>
                    <p className="item-title">{data.shop_name}</p>
                    <div className="pricing-qty">
                        <div><p className="item-subtitle">&#8377;{data.shop_price}/-</p></div>
                        <div></div>
                        <div><p className="item-subtitle">{data.supplier_unit_quantity}{data.supplier_unit_quantity_type}</p></div>
                    </div>
                    <div className="div-add-to-cart">
                        <Button className="btn-add-to-cart">Add to Cart</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Item
