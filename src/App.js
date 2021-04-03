import React, {Component} from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Customer from './customer/customer'
import Checkout from './payments/checkout'
import NotFound from './customer/notFound'
import 'antd/dist/antd.css'
import './App.css'
require('dotenv/config');

class App extends Component{
    render(){
        let routed_display = (
            <div>
                <Switch>
                    <Route path="/" exact render={(props) => <Customer {...props} view="home"/>}/>
                    <Route path="/home" exact render={(props) => <Customer {...props} view="home"/>}/>
                    <Route path="/about" exact render={(props) => <Customer {...props} view="about"/>}/>
                    <Route path="/account" exact render={(props) => <Customer {...props} view="account"/>}/>
                    <Route path="/blog" exact render={(props) => <Customer {...props} view="blog"/>}/>
                    <Route path="/categories" exact render={(props) => <Customer {...props} view="categories"/>}/>
                    <Route path="/category" exact render={(props) => <Customer {...props} view="category"/>}/>
                    <Route path="/legal" exact render={(props) => <Customer {...props} view="legal"/>}/>
                    <Route path="/login" exact render={(props) => <Customer {...props} view="login"/>}/>
                    <Route path="/product" exact render={(props) => <Customer {...props} view="product"/>}/>
                    <Route path="/register" exact render={(props) => <Customer {...props} view="register"/>}/>
                    <Route path="/checkout" exact render={(props) => <Checkout {...props}/>}/>
                    <Route path="/" render={(props) => <NotFound {...props}/>}/>
                </Switch>
            </div>
        )
        return (
            <Router>
                <div>
                    {routed_display}
                </div>
            </Router>
        )
    }
}

export default App;
