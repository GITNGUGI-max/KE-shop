import React, {useState, useEffect} from 'react'
import {  Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Button, ListGroup, Card, Image, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import {useDispatch, useSelector} from 'react-redux'
import {listProductsDetails, createProductReview} from '../actions/productAction'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'


const ProductPage = () => {

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')


    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product } = productDetails

    
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo } = userLogin

    
    const productReview = useSelector(state => state.productReview)
    const {loading:loadingProductReview, error:errorProductReview, success:successProductReview } = productReview

    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        if(successProductReview){
            setRating(0)
            setComment('')
            dispatch({
                type:PRODUCT_CREATE_REVIEW_RESET
            })
        }

        dispatch(listProductsDetails(id))
    
    }, [dispatch, successProductReview, id])

    const addToCartHandler = ()=>{
       navigate(`/cart/${id}?qty=${qty}`)
    }

    const submitHandler = (e)=>{
        e.preventDefault()

        dispatch(createProductReview(
            id, {
                rating,
                comment
            }
              
            
        ))
    }
 
  return (
    <div>
        <Link to='/' className='btn btn-light my-3'>Go Back</Link>
        {
        loading ? <Loader/>:
        error ? <Message variant='danger'>{error}</Message>:(
            <div>
        <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid/>
            </Col>
            <Col md={3}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                       <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Price:  <h3>Ksh. {product.price}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Description: <p>{product.description}</p>
                    </ListGroup.Item>
                </ListGroup>

            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>Price: </Col>
                                <Col>
                                    <strong>{product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Status:</Col>
                                <Col>
                                    <strong>
                                        {product.countInStock > 0 ? 'In stock' : 'Out of Stock'}
                                    </strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        {product.countInStock >0 && (
                        <ListGroup.Item>
                    
                            <Row>
                                <Col>QTY:</Col>
                                <Col xs='auto' className="my-1">
                                    <Form.Control
                                        as='select'
                                        value ={qty}
                                        onChange = {(e)=> setQty(e.target.value)}
                                    >
                                        {
                                            [...Array(product.countInStock).keys()].map((x)=>(
                                                <option value={x + 1} key={x +1 }>
                                                    {x + 1}
                                                </option>
                                            ))
                                        }

                                    </Form.Control>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        )}
                        <ListGroup.Item>
                            <Button className='btn-block' disabled={product.countInStock == 0} 
                            onClick = {addToCartHandler} type='button'>Add to Cart</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>

        <Row>
            <Col md={6}>
                <h4>Reviews</h4>
                {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}

                <ListGroup variant='flush'>
                    {product.reviews.map(review=>(
                        <ListGroup.Item key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating value={review.rating} color='#f80825'/>
                            <p>{review.createdAt.substring(0,10)}</p>
                            <p>{review.comment}</p>
                       
                        </ListGroup.Item>
                    ))}

                    <ListGroup.Item>
                        <h4>Write a Review</h4>
                    {loadingProductReview && <Loader/>}
                    {successProductReview && <Message variant='success'>Review Submitted.</Message>}
                    {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

                        {userInfo ? (
                              <Form onSubmit={submitHandler}>

                              <Form.Group controlId='rating'>
                                  <Form.Label>Rating</Form.Label>
                                  <Form.Control 
                                      as='select'
                                      value={rating}
                                      onChange={(e)=>setRating(e.target.value)}
                                  >
                                      <option value='select'>Select Rating</option>
                                      <option value='1'>1-Poor</option>
                                      <option value='2'>2-Fair</option>
                                      <option value='3'>3-Good</option>
                                      <option value='4'>4-Very Good</option>
                                      <option value='5'>5-Excellent</option>
                                  </Form.Control>
                              </Form.Group>
                              <Form.Group controlId='comment'>
                                  <Form.Label>Review</Form.Label>
                                  <Form.Control 
                                      as='textarea'
                                      value={comment}
                                      row='5'
                                      onChange={(e)=>setComment(e.target.value)}
                                  >
                                  </Form.Control>
                              </Form.Group>
                              <Button disabled={loadingProductReview} type='submit' variant='primary'>Submit</Button>
  
                          </Form>
                        ):(
                            <ListGroup.Item>
                                <p>Please <Link to='/login'><strong>login</strong></Link> to write a review.</p>
                            </ListGroup.Item>
                        )}
                      
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
        </div>
        )
}
    </div>
  )
}

export default ProductPage