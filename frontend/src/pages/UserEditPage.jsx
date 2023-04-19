import React, {useState, useEffect} from 'react'
import { Button,  Form} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useNavigate, useParams} from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {getUserDetails, updateUser} from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { USER_ADMIN_UPDATE_RESET } from '../constants/userConstants'


const UserEditPage = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
 


    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {id} = useParams()


    const userDetails = useSelector(state=>state.userDetails)
    const {error, loading, user} = userDetails

    
    const userUpdate = useSelector(state=>state.userUpdate)
    const {error:errorUpdate, loading:loadingUpdate, success:successUpdate} = userUpdate

    useEffect(()=>{
        if(successUpdate){
            dispatch({
                type: USER_ADMIN_UPDATE_RESET
            })
            navigate('/admin/userlist')
        }else{
            if(!user.name || user._id !== Number(id)){
                dispatch(getUserDetails(id))
            }else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

    }, [user, id, navigate, successUpdate ])



    const submitHandler = (e)=>{
        e.preventDefault()

        dispatch(updateUser({
            _id:user._id,
            name,
            email,
            isAdmin
        }))

    }
  return (
    <>
    <Link to='/admin/userlist'>
        Go Back
    </Link>
    <FormContainer>

        <h1>Update User</h1>
        {loadingUpdate && <Loader/>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message> }
        {loading ? (<Loader/>):
            error ?(
                <Message variant='danger'>{error}</Message>
            ):
            (
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>
                    Name:
                </Form.Label>
                <Form.Control
                  
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
                  
                    type='email'
                    placeholder='Enter Email'
                    value = {email}
                    onChange ={e=>setEmail(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='isAdmin'>
                <Form.Label>
                    Is Admin:
                </Form.Label>
                <Form.Check
                    type='checkbox'
                    label='Is Admin'
                    checked = {isAdmin}
                    onChange ={e=>setIsAdmin(e.target.checked)}
                >
                </Form.Check>
            </Form.Group>
            

            <Button type='submit' variant='primary'>Update</Button>

        </Form>
            )}
        

    
    </FormContainer>
    </>
  )
}

export default UserEditPage