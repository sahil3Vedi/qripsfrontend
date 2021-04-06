import React, {Component} from 'react'
import Spinner from '../customercomps/spinner'
import Item from '../customercomps/item'
import axios from 'axios'

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
        console.log(this.state.pathname.split('/')[2])
        let params = {params:{"category": "cheese"}}
        axios.get(`${process.env.REACT_APP_BACKEND}/products/fetch/${this.state.pathname.split('/')[2]}`)
        .then(res=>{
            this.setState({
                products: res.data,
                loading: false
            })
        })
    }

    render(){
        let items = this.state.products.map(p=><Item data={p} key={p.supplier_name}/>)
        return (
            <div>
                {
                    this.state.loading ?
                    <Spinner tip="Loading..."/>
                    :
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",columnGap:"10px",margin:"10px 20px"}}>
                        {items}
                    </div>
                }
            </div>
        )
    }
}

export default Product
