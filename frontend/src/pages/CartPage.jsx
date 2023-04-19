import React, {useEffect} from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, Button, ListGroup, Form, Card } from 'react-bootstrap'
import Message from '../components/Message'
import {addToCart, removeFromCart} from '../actions/cartActions'

const CartPage = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const {id} = useParams()
  const qty = location.search ? Number(location.search.split('=')[1]):1

  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const {cartItems} = cart


  useEffect(()=>{

    if (id){
      dispatch(addToCart(id, qty))
    }
  }, [dispatch, id, qty])

  const removeFromCartHandler =(id)=>{
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = ()=>{
      navigate('/shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ?(
          <Message variant='info'>
            There are no items in the shopping cart. <Link to='/'>Proceed To Shopping</Link>
          </Message>
        ):(
          <ListGroup variant='flush'>
           {
            cartItems.map(item=>(
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded/>
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                    Ksh. {item.price}
                  </Col>
                  <Col md={3}>
                  <Form.Control
                                        as='select'
                                        value ={item.qty}
                                        onChange = {(e)=> dispatch( addToCart(item.product, Number(e.target.value)))}
                                    >
                                        {
                                            [...Array(item.countInStock).keys()].map((x)=>(
                                                <option value={x + 1} key={x +1 }>
                                                    {x + 1}
                                                </option>
                                            ))
                                        }

                                    </Form.Control>
                  </Col>
                <Col md={1}>
                  <Button type='button' variant='light'
                    onClick = {()=>removeFromCartHandler(item.product)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </Col>

              </Row>

            </ListGroup.Item>
            ))
           }
        
          </ListGroup>
        )}

      </Col>
      <Col md={4}>
        <Card>
          <ListGroup>
            <ListGroup.Item>
              <h5>Total Items: ({cartItems.reduce((acc, item)=>acc+item.qty, 0)})</h5>
              <h5>Total Price: ({cartItems.reduce((acc, item)=>acc+item.qty * item.price, 0).toFixed(2)})</h5>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}

                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
        </Col>
    </Row>
  )
}

export default CartPage