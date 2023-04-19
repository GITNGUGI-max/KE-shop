import React, {useState, useEffect} from 'react'
import {Table, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listOrders, } from '../actions/orderActions'
import {useNavigate} from 'react-router-dom'

const OrderListPage = () => {

    const ordersList = useSelector(state=>state.ordersList)
    const {loading, orders, error} = ordersList

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin



    const dispatch = useDispatch()



    const navigate = useNavigate()

    useEffect(()=>{

        if(userInfo && userInfo.isAdmin){
            dispatch(listOrders())
        }else{
            navigate('/login')
        }
       
    }, [dispatch, navigate, userInfo])


  return (
    <div>
        <h1>Orders</h1>
        {loading ? (
                    <Loader/>
                ):error ? (
                    <Message variant='danger'>{error}</Message>
                ):(
                    <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
        
                    <tbody>
                      {orders?.map(order=>(
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user && order.user.name}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>Ksh. {order.totalPrice}</td>
                            <td>{order.isPaid ? <i className='fas fa-check' style={{color:'green'}}></i>:<i className='fas fa-times' style={{color:'red'}}></i> }</td>
                            <td>{order.isDelivered ? 
                            (<i className='fas fa-check' style={{color:'green'}}></i>):
                            <i className='fas fa-times' style={{color:'red'}}></i>
                            }</td>
                          
                            <td>
                                <LinkContainer to={`/order/${order._id}/`}>
                                    <Button className='btn-sm' variant='light'>Details</Button>
                                </LinkContainer>

                            </td>
                            

                        </tr>
                      ))}

                    </tbody>
                </Table>
                )}
      

    </div>
  )
}

export default OrderListPage