import React, {useState, useEffect} from 'react'
import {Row, Col  } from 'react-bootstrap'
import Product from '../components/Product'
import {useDispatch, useSelector} from 'react-redux'
import { listProducts } from '../actions/productAction'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useNavigate } from 'react-router-dom'

import ProductCarousel from '../components/ProductCarousel'

const HomePage = () => {


  const dispatch = useDispatch()
  const navigate = useNavigate()


  const productList = useSelector(state=>state.productList)
  const {error, loading, products} = productList
  
  // const query = navigate().search


  useEffect(()=>{

    
    dispatch(listProducts())

  }, [dispatch])



    return (
      <div>
        <ProductCarousel/>
          <h1>Latest Products</h1>
        {
        loading ? <Loader/>:
        error ? <Message variant='danger'>{error}</Message>:
        <Row>
        {products.map(product=>(
            <Col key={product._id} sm={12} md={6} lg={4} xlg={3}>
              
                  <Product product={product} />
              
            </Col>
              ))}
        </Row>

      }

          
      </div>
    )
}

export default HomePage