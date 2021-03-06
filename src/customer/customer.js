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
    render(){
        let customer_view = <Home/>
        switch (this.props.view){
            case("home"):
                customer_view = <Home/>
                break
            case("legal"):
                customer_view = <Legal/>
                break
            case("login"):
                customer_view = <Login/>
                break
            case("product"):
                customer_view = <Product/>
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
                customer_view = <Home/>
                break
        }
        return (
            <div>
                <Navbar/>
                {customer_view}
            </div>
        )
    }
}

export default Customer