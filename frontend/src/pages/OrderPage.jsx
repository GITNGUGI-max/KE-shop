import React, {useState, useEffect} from 'react'
import {Row, ListGroup, Image, Card, Col, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {Link, useNavigate, useParams,} from 'react-router-dom'
import {deliverOrder, getOrderDetails, payOrder} from '../actions/orderActions'
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'


const OrderPage = () => {


    const {id} = useParams()

    const [sdkReady, setsdkReady] = useState(false)

    const orderDetails = useSelector(state=>state.orderDetails)
    const { order, error, loading} = orderDetails


    const orderPay = useSelector(state=>state.orderPay)
    const {loading:loadingPay, success:successPay} = orderPay

    const orderDeliver = useSelector(state=>state.orderDeliver)
    const {loading:loadingDeliver, success:successDeliver} = orderDeliver

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const successPaymentHandler = (paymentResult) =>{
        dispatch(payOrder(id, paymentResult))
    }
    const successDeliverHandler = () =>{
        dispatch(deliverOrder(order))
    }

    if(!loading && !error){
      order.itemPrice = order.orderItems.reduce((acc, item)=>acc+item.price*item.qty, 0).toFixed(2)
    }
   
    const addPayPalScript = () => {

        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = "https://www.paypal.com/sdk/js?client-id=AaUnpRA_NQPkzbyIXsa5arSncSuffcmlcCRPRQ3zMAIOEKrLoUheTXRn__fdr2na9kyPRNeasnBw8Kyn"
        script.async = true
        script.onload = () =>{
            setsdkReady(true)
        }
        document.body.appendChild(script)
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()

    



    useEffect(()=>{

        if(!userInfo){
            navigate('/login')
        }

        if(!order || successPay || order._id !== Number(id) || successDeliver){
            dispatch({
                type:ORDER_PAY_RESET
            })
            dispatch({
                type:ORDER_DELIVER_RESET
            })
            dispatch(getOrderDetails(id))
        }else if (!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }else{
                setsdkReady(true)
            }
        }
  
        
      

    }, [dispatch, order, id, successDeliver, successPay])

  return loading ?(
    <Loader/>
  ): error ? (
    <Message variant='danger'>{error}</Message>
  ): (
    <div>
   
    <h1>ORDER: {order._id}</h1>
      <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h1>Shipping Information</h1>
                    <p><strong>Name : {order.user.name}</strong></p>
                    <p><strong>Name : <a href={`mailto:${order.user.email}`}>{order.user.email}</a> </strong></p>
                    <strong>Shipping To: </strong>
                    {order.shippingAddress.address}, {order.shippingAddress.city}
                    {' '}
                    {order.shippingAddress.postalCode}, 
                    {' '}
                    {order.shippingAddress.country}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Delivered?</strong>
                  {order.isDelivered ? (
                      <Message variant='success'>Delivered On: {order.deliveredAt}</Message>
                    ):(
                      <Message variant='warning'>Not Delivered</Message>
                    )}
                </ListGroup.Item>
                <ListGroup.Item>
                    <strong>Method:</strong>
                    {order.paymentMethod}

                    {order.isPaid ? (
                      <Message variant='success'>Paid At: {order.paidAt}</Message>
                    ):(
                      <Message variant='warning'>Not Paid</Message>
                    )}
                </ListGroup.Item>
                <ListGroup.Item>
                    <h1>Order Items</h1>
                    {order.orderItems.length === 0 ? <Message variant='info'>
                        Your order is empty.
                    </Message>:(
                     
                            <ListGroup variant='flush'>
                            {order.orderItems.map((item, index)=>(

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
        <Card>
            <ListGroup>
                <ListGroup.Item>
                    <Row>
                        <Col>Items Price:</Col>
                        <Col>Ksh. {order.itemPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Shipping:</Col>
                        <Col>Ksh. {order.shippingPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Tax:</Col>
                        <Col>Ksh. {order.taxPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Total:</Col>
                        <Col>Ksh. {order.totalPrice}</Col>
                    </Row>
                </ListGroup.Item>


                    {!order.isPaid && (
                        <ListGroup.Item>
                            {loadingPay && <Loader/>}
                            {!sdkReady ?(
                                <Loader/>
                            ):(
                                <PayPalButton
                                    amount = {order.totalPrice}
                                    onSuccess = {successPaymentHandler}
                                />
                            )}
                        </ListGroup.Item>
                    )}
                
                {loadingDeliver && <Loader/>}
                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                    <ListGroup.Item>
                        <Button 
                        type='button'
                        className='btn btn-block'
              
                        onClick={successDeliverHandler}
                        >
                            Mark As Delivered
                        </Button>
                    </ListGroup.Item>
                )}
            
               
            </ListGroup>
           </Card>
        </Col>
      </Row>
      </div>
  )
}

export default OrderPage