import React from 'react'
import Axios from 'axios'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


class DetailProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            img: '',
            total: 0,
            stock: '',
            toLogin: false
        }
    }
    componentDidMount() {
        Axios.get(`http://localhost:2000/products${this.props.location.search}`)
            .then((res) => {
                // console.log(res.data[0])
                this.setState({ data: res.data[0], img: res.data[0].img[1] })
            })
            .catch((err) => console.log(err))
    }

    handleAddToCart = () => {
        console.log('addtocart')
        if (!this.props.username) return this.setState({toLogin:true})

    }

    render() {

        const { data, total,toLogin } = this.state
        // console.log(this.state.data)
        if(toLogin)return <Redirect to='/login'/>
        return (
            <div>
                <h1>ini product detail</h1>
                <div>
                    <div>
                        <img src={data.img} />
                    </div>
                    <div>
                        <h1>Brand      : {data.name}</h1>
                        <h2>Description: {data.description}</h2>
                        <h3>Price      : IDR {data.price}</h3>
                        <h3>Sisa Stok  : {data.stock} </h3>
                        <h3>Quantity   : </h3>
                        <div>
                            <Button disabled={total >= data.stock ? true : false} onClick={() => this.setState({ total: total + 1 })}>+</Button>
                            <h3>{total}</h3>
                            <Button disabled={total <= 0 ? true : false} onClick={() => this.setState({ total: total - 1 })}>-</Button>
                        </div>
                    </div>
                    <Button onClick={this.handleAddToCart}>Add to Cart</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.user.username
    }
}
export default connect(mapStateToProps)(DetailProduct)