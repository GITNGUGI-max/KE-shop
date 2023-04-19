import React, {useState, useEffect} from 'react'
import {Table, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listUsers, deleteUser } from '../actions/userActions'
import {useNavigate} from 'react-router-dom'

const UserListPage = () => {

    const userList = useSelector(state=>state.userList)
    const {loading, users, error} = userList

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    
    const userDelete = useSelector(state=>state.userDelete)
    const {success:successDelete} = userDelete

    const dispatch = useDispatch()

    const deleteHandler=(id)=>{

        if(window.confirm('Are you sure you want to delete this user?')){
            dispatch(deleteUser(id))
        }
        
    }

    const navigate = useNavigate()

    useEffect(()=>{

        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        }else{
            navigate('/login')
        }
       
    }, [dispatch, navigate, successDelete, userInfo])
  return (
    <div>
        <h1>Users</h1>
        {loading ? (
                    <Loader/>
                ):error ? (
                    <Message variant='danger'>{error}</Message>
                ):(
                    <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
        
                    <tbody>
                      {users?.map(user=>(
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? 
                            (<i className='fas fa-check' style={{color:'green'}}></i>):
                            <i className='fas fa-times' style={{color:'red'}}></i>
                            }</td>
                            <td>
                                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                    <Button className='btn-sm' variant='light'><i className='fas fa-edit' style={{color:'green'}}></i></Button>
                                </LinkContainer>
                                <Button className='btn-sm' onClick={()=>deleteHandler(user._id)}>
                                <i className='fas fa-trash' style={{color:'red'}}></i>
                                </Button>
                            </td>
                            

                        </tr>
                      ))}

                    </tbody>
                </Table>
                )}
      

    </div>
  )
}

export default UserListPage