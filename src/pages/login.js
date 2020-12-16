import React from 'react'
import Axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { login } from '../action'
import { Redirect, Link } from 'react-router-dom'


const URL = 'http://localhost:2000/users'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            emailValidErr: [false, ""],
            passValidErr: [false, ""]
        }
    }

    handleRegister = () => {
        let username = this.refs.username.value
        let email = this.refs.email.value
        let password = this.refs.password.value

        Axios.post('http://localhost:2000/users', {
            username: username,
            email: email,
            password: password,
            cart: []
        })
            .then((res) => {
                console.log(res.data)
                Axios.get(`http://localhost:2000/users?username=${username}&password=${password}`)
                .then((res)=>{
                    console.log(res)

                    this.props.login(res.data[0])
                    localStorage.username = username

                })

                .catch((err)=>(err))
                // console.log('reg berhasil')
            })
            .catch((err) => console.log(err))
    }


    emailValid = (e) => {
        let email = e.target.value
        console.log(email)
        let regex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!regex.test(email)) return this.setState({ emailValidErr: [true, "*Email not valid"] })

        this.setState({ emailValidErr: [false, ""] })
    }

    passValid = (e) => {
        let password = e.target.value
        // console.log(password)
        let symb = /[!@#$%^&*;]/
        let numb = /[0-9]/
        // let upper = /[A-Z]/

        if (!symb.test(password) || !numb.test(password) || password.length < 6) return this.setState({ passValidErr: [true, "*must include symbol, number,min 6 char"] })

        this.setState({ passValidErr: [false, ""] })
    }

    render() {
        if(this.props.username) return <Redirect to='/home'/>
        const { emailValidErr, passValidErr } = this.state
        return (
            <div>
                <Form>
                <Form.Group controlId="formBasicEmail">
                        <Form.Label>username</Form.Label>
                        <Form.Control
                            type="username"
                            placeholder="Enter username"
                            ref="username"
                            // onChange={(e) => this.userValid(e)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            ref="email"
                            onChange={(e) => this.emailValid(e)}
                        />
                    </Form.Group>
                    <Form.Text className="mb-3" style={{ textAlign: "left", color: "red", fontSize: '10px' }}>
                        {emailValidErr[1]}
                    </Form.Text>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            ref="password"
                            type="password"
                            placeholder="Password"
                            onChange={(e) => this.passValid(e)}
                        />
                    </Form.Group>
                    <Form.Text className="mb-3" style={{ textAlign: "left", color: "red", fontSize: '10px' }}>
                        {passValidErr[1]}
                    </Form.Text>
                    <Button as={Link} to='/home' onClick={this.handleRegister} variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

export default connect(null, {login})(Login)