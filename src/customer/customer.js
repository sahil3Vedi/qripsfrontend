import React, {Component} from 'react'

import Home from './home'
import Legal from './legal'
import Login from './login'
import Product from './product'
import Register from './register'
import About from './about'
import Account from './account'
import Blog from './blog'
import Categories from './categories'
import Category from './category'
import NotFound from './notFound'

import Navbar from '../customercomps/navbar'

class Customer extends Component{
    constructor(props){
        super(props)
        this.child = React.createRef()
        this.state = {
            navTop: true
        }
    }

    componentDidMount() {
        window.onscroll = () => {
            if(window.pageYOffset === 0) {
                this.setNavTop(true)
            } else {
                this.setNavTop(false)
            }
        };
    }

    componentWillUnmount() {
        window.onscroll = null;
    }

    toggleLHS = () => {
        this.child.current.toggleLHS()
    }

    setNavTop = (value) => {
        this.setState({navTop: value})
    }

    render(){
        let customer_view = <Home/>
        switch (this.props.view){
            case("home"):
                customer_view = <Home toggleLHS={this.toggleLHS}/>
                break
            case("legal"):
                customer_view = <Legal/>
                break
            case("login"):
                customer_view = <Login/>
                break
            case("products"):
                customer_view = <Product key={this.props.location.pathname} pathname={this.props.location.pathname} setNavTop={this.setNavTop}/>
                break
            case("register"):
                customer_view = <Register/>
                break
            case("about"):
                customer_view = <About/>
                break
            case("account"):
                customer_view = <Account/>
                break
            case("blog"):
                customer_view = <Blog/>
                break
            case("categories"):
                customer_view = <Categories/>
                break
            case("category"):
                customer_view = <Category/>
                break
            case("notFound"):
                customer_view = <NotFound/>
                break
            default:
                customer_view = <Home toggleLHS={this.toggleLHS}/>
                break
        }
        return (
            <div>
                <Navbar pathname={this.props.location.pathname} navTop={this.state.navTop} ref={this.child}/>
                <div className="customer-view">
                    {customer_view}
                </div>
            </div>
        )
    }
}

export default Customer
