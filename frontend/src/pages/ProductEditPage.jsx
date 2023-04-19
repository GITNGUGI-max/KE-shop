import React, {useState, useEffect} from 'react'
import { Button,  Form} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useNavigate, useParams} from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listProductsDetails, updateProduct} from '../actions/productAction'
import FormContainer from '../components/FormContainer'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import axios from 'axios'


const ProductEditPage = () => {

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
 


    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {id} = useParams()


    const productDetails = useSelector(state=>state.productDetails)
    const {error, loading, product} = productDetails

    
    const productUpdate = useSelector(state=>state.productUpdate)
    const {error:errorUpdate, loading:loadingUpdate, success:successUpdate} = productUpdate

    useEffect(()=>{
        if(successUpdate){
            dispatch({
                type: PRODUCT_UPDATE_RESET
            })
            navigate('/admin/productlist')
        }else{

            if(!product.name || product._id !== Number(id)){
                dispatch(listProductsDetails(id))
            }else{
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCountInStock(product.countInStock)
                setCategory(product.category)
                setDescription(product.description)
            }
        }

      

    }, [product, id, navigate, successUpdate, dispatch ])



    const submitHandler = (e)=>{
        e.preventDefault()

        dispatch(updateProduct({
            _id:product._id,
            name,
            price,
            image,
            brand,
            countInStock,
            category,
            description
        }))

    }

    const uploadFileHandler = async (e)=>{
        const file = e.target.files[0]

        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', id)

        setUploading(true)

        try{

            const config = {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            }
            const {data} = await axios.post(
                'http://localhost:8000/api/products/upload/', formData, config
            )
            
            setImage(data)
            setUploading(false)

        }catch(error){
            setUploading(false)
        }

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
            <Form.Group controlId='price'>
                <Form.Label>
                    Price:
                </Form.Label>
                <Form.Control
                  
                    type='number'
                    placeholder='Enter price'
                    value = {price}
                    onChange ={e=>setPrice(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
         
            <Form.Group controlId='image'>
                <Form.Label>
                    Image:
                </Form.Label>
                <Form.Control
                  
                    type='text'
                    placeholder='Enter Name'
                    value = {image}
                    onChange ={e=>setImage(e.target.value)}
                >
                </Form.Control>
                <Form.Control
                
                    controlid='image-file'
                    type='file'
                    label = 'Choose File'
                    onChange={uploadFileHandler}                
                >

                </Form.Control>
                {uploading && <Loader/>}
            </Form.Group>
            <Form.Group controlId='barnd'>
                <Form.Label>
                    Brand:
                </Form.Label>
                <Form.Control
                  
                    type='text'
                    placeholder='Enter Brand'
                    value = {brand}
                    onChange ={e=>setBrand(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='countInStock'>
                <Form.Label>
                    Count In Stock:
                </Form.Label>
                <Form.Control
                  
                    type='number'
                    placeholder='Enter Count in Stock'
                    value = {countInStock}
                    onChange ={e=>setCountInStock(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='category'>
                <Form.Label>
                    Category:
                </Form.Label>
                <Form.Control
                  
                    type='text'
                    placeholder='Enter Category'
                    value = {category}
                    onChange ={e=>setCategory(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='description'>
                <Form.Label>
                    Description:
                </Form.Label>
                <Form.Control
                  
                    type='text'
                    placeholder='Enter Description'
                    value = {description}
                    onChange ={e=>setDescription(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>Update</Button>

        </Form>
            )}
        

    
    </FormContainer>
    </>
  )
}

export default ProductEditPage