import React, {Component} from 'react'
import { Button, Tag } from 'antd'
import { LeftOutlined } from '@ant-design/icons'

class Item extends Component{
    componentDidMount(){
        this.setState({
            expanded: false,
        })
    }

    popOut = () => {
        console.log("pop out")
        this.setState({expanded: true})
    }

    popIn = () => {
        console.log("pop out")
        this.setState({expanded: false})
    }

    render(){
        let data = this.props.data
        let expansion_class = (this.state && this.state.expanded)
        return(
            <div>
                <div></div>
                <div className={expansion_class ? "expanded view-product" : "view-product"}>
                    <div className="product-image-container">
                        <div className="div-product-image">
                            <div></div>
                            <div style={{backgroundColor:`${data.color}`,borderRadius:"10px 10px 0px 0px"}}></div>
                        </div>
                        <div className="div-product-image-overlay">
                            <div class="div-btn-back">
                                <div><Button className="btn-back" onClick={this.popIn} icon={<LeftOutlined />}>Back</Button></div>
                                <div></div>
                                <div><Tag color="#87d068">In Stock</Tag></div>
                            </div>
                            <img className="product-image" src={data.supplier_images[0]} onClick={this.popOut} alt="product"/>
                        </div>
                    </div>
                    <div style={{backgroundColor:`${data.color}`}} className="product">
                        <div className={expansion_class ? "expanded-info info" : "info"}>
                            <div onClick={this.popOut}>
                                <p className="item-subtitle">{data.shop_company}</p>
                                <p className="item-title">{data.shop_name}</p>
                                <div className="pricing-qty">
                                    <div><p className="item-subtitle">&#8377;{data.shop_price}/-</p></div>
                                    <div></div>
                                    <div><p className="item-subtitle">{data.supplier_unit_quantity}{data.supplier_unit_quantity_type}</p></div>
                                </div>
                            </div>
                            <div className="div-add-to-cart">
                                <Button className="btn-add-to-cart">Add to Cart</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Item
