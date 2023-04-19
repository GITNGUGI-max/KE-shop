import React, {useState, useEffect} from 'react'
import {Row, Button, Col, Form, Table} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {getUserDetails, updateUserProfile} from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'
import {LinkContainer} from 'react-router-bootstrap'

const ProfilePage = () => {



    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()



    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const userDetails = useSelector(state=>state.userDetails)
    const {error, loading, user} = userDetails


    const userProfileUpdate = useSelector(state=>state.userProfileUpdate)
    const {success} = userProfileUpdate

    const myOrdersList = useSelector(state=>state.myOrdersList)
    const {loading:loadingOrders, error:errorOrders, orders} = myOrdersList


    useEffect(()=>{
        if (!userInfo){
            navigate('/login')
        }else{
            if(!user || !user.name || success || userInfo._id !== user._id){
                dispatch({type:USER_UPDATE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, user, navigate, userInfo, success])



    const submitHandler = (e)=>{
        e.preventDefault()

        if (password != confirmPassword){

            setMessage('The passwords do not match.')
        }else{
           dispatch(updateUserProfile({
            'id':user._id,
            'name':name,
            'email':email,
            'password':password
           }))

           setMessage('')
        }


    }
  return (
    <Row>
        <Col md={3}>
            <h1>User Profile</h1>
            {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>
                    Name:
                </Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Enter Name'
                    value = {name}
                    onChange ={e=>setName(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
                <Form.Label>
                    Email Address:
                </Form.Label>
                <Form.Control
                    required
                    type='email'
                    placeholder='Enter Email'
                    value = {email}
                    onChange ={e=>setEmail(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>
                    Password:
                </Form.Label>
                <Form.Control
                   
                    type='password'
                    placeholder='Enter Password'
                    value = {password}
                    onChange ={e=>setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='passwordConfirm'>
                <Form.Label>
                    Password:
                </Form.Label>
                <Form.Control
               
                    type='password'
                    placeholder='Confirm Password'
                    value = {confirmPassword}
                    onChange ={e=>setConfirmPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>Update</Button>

        </Form>

        </Col>
        <Col md={9}>
            <h1>My Orders</h1>
            {loadingOrders ?(
                <Loader/>
            ): error ? (
                <Message variant='danger'>{error}</Message>
            ):(
                <Table striped responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order=>(
                            <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td> KSh.{order.totalPrice}</td>
                            <td>{order.isPaid ? <i className='fas fa-check' style={{color:'green'}}></i>:<i className='fas fa-times' style={{color:'red'}}></i> }</td>
                            <td>{order.isDelivered ? <i className='fas fa-check' style={{color:'green'}}></i>:<i className='fas fa-times' style={{color:'red'}}></i> }</td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                    <Button className='btn-sm'>View</Button>
                                </LinkContainer>
                            </td>
                            </tr>
                        ))}

                    </tbody>

                </Table>
            )}
        </Col>
    </Row>
    
  )
}

export default ProfilePage