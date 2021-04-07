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
                    <p>{data.shop_company}</p>
                    <p>{data.shop_name}</p>
                    <div className="pricing-qty">
                        <div><p>&#8377;{data.shop_price}/-</p></div>
                        <div></div>
                        <div><p>300g</p></div>
                    </div>
                    <div className="div-add-to-cart">
                        <Button>Add to Cart</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Item
