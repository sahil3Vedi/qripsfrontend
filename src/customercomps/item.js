import React, {Component} from 'react'
import { Button, Tag, Carousel } from 'antd'
import { LeftOutlined } from '@ant-design/icons'

class Item extends Component{
    componentDidMount(){
        this.setState({
            expanded: false,
            expansionBottom: false
        })
    }

    popOut = () => {
        this.setState({expanded: true})
        this.setExpansionBottom(false)
    }

    popIn = () => {
        this.setState({expanded: false})
        this.setExpansionBottom(false)
    }

    setExpansionBottom = (value) => {
        this.setState({
            expansionBottom: value
        })
    }

    handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
        this.setExpansionBottom(bottom)
    }

    render(){
        let data = this.props.data
        let expansion_class = (this.state && this.state.expanded)
        let expansion_bottom = (expansion_class && this.state && this.state.expansionBottom)
        let carousel = data.shop_images.map(d=>
            <div key={d}><img className="product-image" src={d} onClick={this.popOut} alt="product"/></div>
        )
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
                            <div className="div-btn-back">
                                <div><Button className="btn-back" onClick={this.popIn} icon={<LeftOutlined />}>Back</Button></div>
                                <div></div>
                                <div><Tag color="#008000">In Stock</Tag></div>
                            </div>
                            <div style={{zIndex:5,display:"block"}}>
                                <Carousel class="carousel">
                                    {carousel}
                                </Carousel>
                            </div>
                        </div>
                    </div>
                    <div style={{backgroundColor:`${data.color}`}} className="product" onScroll={this.handleScroll}>
                        <div className={expansion_class ? "expanded-info info" : "info"}>
                            <div style={{marginBottom:"20px",marginLeft:"37.5%",width:"25%",height:"5px",backgroundColor:"rgba(0,0,0,0.25)",borderRadius:"10px",display:(expansion_class ? "block" : "none")}}></div>
                            <div onClick={this.popOut}>
                                <p className="item-subtitle">{data.shop_company}</p>
                                <p className="item-title">{data.shop_name}</p>
                                <div className="pricing-qty">
                                    <div><p className="item-subtitle">&#8377;{data.shop_price}/-</p></div>
                                    <div></div>
                                    <div><p className="item-subtitle">{data.supplier_unit_quantity}{data.supplier_unit_quantity_type}</p></div>
                                </div>
                                {
                                    expansion_class
                                    ?
                                    <div className="description">
                                        <p>{data.shop_description}</p>
                                    </div>
                                    :
                                    null
                                }
                            </div>
                            <div className={expansion_bottom ?  "div-add-to-cart" : "div-add-to-cart exp-bottom"}>
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
