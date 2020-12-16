import React from 'react'
import Axios from 'axios'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Products extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        Axios.get('http://localhost:2000/products')
            .then((res) => {
                // console.log(res.data)
                this.setState({ data: res.data })
            })
            .catch((err) => console.log(err))
    }
    render() {
        // console.log(this.state.data)
        return (
            <div>
                {this.state.data.map((item, index) => {
                    return (
                        <div>
                            <h1> Products </h1>
                            <Card key={index} style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={item.img} />
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Text>
                                        {item.description}
                                    </Card.Text>
                                    <Button variant="primary">wish list</Button>
                                    <Button as={Link} to={`/detail?id=${item.id}`}  variant="primary">buy now</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Products