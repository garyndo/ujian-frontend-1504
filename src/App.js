import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Axios from 'axios'
import { connect } from 'react-redux'
import Navigation from './components/navigation'
import DetailProduct from './pages/detailProduct'
import Home from './pages/home'
import Login from './pages/login'
import { login } from './action'

class App extends React.Component {
    componentDidMount() {
        Axios.get(`http://localhost:2000/users?username=${localStorage.username}`)
            .then((res) => this.props.login(res.data[0]))
            .catch((err) => console.log(err))

    }

    render() {
        return (
            <div>
                <Navigation />
                <Switch>
                    <Route path='/home' component={Home} />
                    <Route path='/login' component={Login} />
                    <Route path='/detail' component={DetailProduct} />
                </Switch>
            </div>
        )
    }
}

export default connect(null, { login })(App)