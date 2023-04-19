import React from 'react'
import {Container, Row, Col, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer  } from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../actions/userActions'
import SearchBox from './SearchBox'

const Header = () => {

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
    
    const dispatch = useDispatch()

    const logoutHandler = () =>{
         dispatch(logout())
    }

  return (
    <header>
      <Navbar bg="dark" variant='dark' expand="lg">
      <Container>
        <LinkContainer to="/">
        <Navbar.Brand>KE-Shop</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <SearchBox/>
          <Nav className="ml-auto" style={{marginLeft:'auto'}}>

            <LinkContainer to="/cart">
            <Nav.Link ><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
            </LinkContainer>
          {userInfo ? (
            <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
            </NavDropdown>
          ):(
            <LinkContainer to="/login">
            <Nav.Link ><i className='fas fa-user'></i>Login</Nav.Link>
            </LinkContainer>
          )}

          {userInfo && userInfo.isAdmin && (
            <NavDropdown title='ADMIN' id='adminmenu'>
            <LinkContainer to='/admin/userlist'>
              <NavDropdown.Item>Users</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/admin/products'>
              <NavDropdown.Item>Products</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/admin/orders'>
              <NavDropdown.Item>Orders</NavDropdown.Item>
            </LinkContainer>

          </NavDropdown>

          )}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header
