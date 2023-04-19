import React, {useState, useEffect} from 'react'
import {Row, ListGroup, Image, Card, Button, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import {Link, useNavigate,} from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import {createOrder} from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

const PlaceOrderPage = () => {

    const cart = useSelector(state=> state.cart)


    const orderCreate = useSelector(state=>state.orderCreate)
    const { order, error, success} = orderCreate
    

    cart.itemPrice = cart.cartItems.reduce((acc, item)=>acc+item.price*item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.itemPrice > 10000 ? 0 : 100)
    cart.taxPrice = Number((0.05)*cart.itemPrice).toFixed(2)
    cart.totalPrice = (Number(cart.itemPrice)+ Number(cart.shippingPrice )+ Number(cart.taxPrice)).toFixed(2)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    

    const placeOrder = ()=>{
        dispatch(createOrder(
            {
                orderItems: cart.cartItems,
                shippingAddress:cart.shippingAddress,
                paymentMethod:cart.paymentMethod,
                itemPrice:cart.itemPrice,
                shippingPrice:cart.shippingPrice,
                taxPrice:cart.taxPrice,
                totalPrice:cart.totalPrice
            }
        ))
        
    }

    useEffect(()=>{
        if(success){
            navigate(`/order/${order._id}`)
      
           
            dispatch({
                type: ORDER_CREATE_RESET
            })
        }
  
        
        if(!cart.paymentMethod){
            navigate('/payment')
        }

    }, [success, navigate])

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />

      <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h1>Shipping Information</h1>
                    <strong>Shipping To:</strong>
                    {cart.shippingAddress.address}, {cart.shippingAddress.city}
                    {' '}
                    {cart.shippingAddress.postalCode}, 
                    {' '}
                    {cart.shippingAddress.country}
                </ListGroup.Item>
                <ListGroup.Item>
                    <strong>Method:</strong>
                    {cart.paymentMethod}
                </ListGroup.Item>
                <ListGroup.Item>
                    <h1>Order Items</h1>
                    {cart.cartItems.length === 0 ? <Message variant='info'>
                        Your cart is empty.
                    </Message>:(
                     
                            <ListGroup variant='flush'>
                            {cart.cartItems.map((item, index)=>(

                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col >
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.qty} x KSH. {item.price} = {(item.qty * item.price).toFixed(2)}
                                        </Col>
                                    </Row>
                                    
                                </ListGroup.Item>
                             ))}
                            </ListGroup>
                       
                    )}
                    
                </ListGroup.Item>
            </ListGroup>
        </Col>

        <Col md={4}>
            <ListGroup>
                <ListGroup.Item>
                    <Row>
                        <Col>Items Price:</Col>
                        <Col>Ksh. {cart.itemPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Shipping:</Col>
                        <Col>Ksh. {cart.shippingPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Tax:</Col>
                        <Col>Ksh. {cart.taxPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Total:</Col>
                        <Col>Ksh. {cart.totalPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    {error && <Message>{error}</Message>}
                </ListGroup.Item>
                <Button 
                type='button' 
                className='btn-block' 
                 disabled = {cart.cartItems == 0}               
                onClick={placeOrder}
                >Place Order</Button>
            </ListGroup>
        </Col>
      </Row>
      </div>
  )
}

export default PlaceOrderPage