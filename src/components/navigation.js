import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Dropdown } from 'react-bootstrap'
import { logout } from '../action'

class Navigation extends React.Component {
    handleLogout = () =>{
        this.props.logout()
        localStorage.removeItem('username')
    }

    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand as={Link} to='/home'>TOKO SEPATU</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {this.props.username ? this.props.username : 'Login'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {this.props.username
                                ?
                                <Dropdown.Item onClick={this.handleLogout}>logout</Dropdown.Item>
                                :
                                <>
                                    <Dropdown.Item as={Link} to='/login'>login</Dropdown.Item>
                                </>
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                        {/* <Nav className="mr-auto">
                            <Nav.Link as={Link} to='/login'>

                            </Nav.Link>
                        </Nav> */}
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.user.username
    }
}

export default connect(mapStateToProps, {logout})(Navigation)