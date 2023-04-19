import React, {useState, useEffect} from 'react'
import {Form, Button, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import {savePaymentMethod} from '../actions/cartActions'
import {useNavigate} from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentPage = () => {

    const cart = useSelector(state=> state.cart)
    const {shippingAddress} = cart

    const [paymentMethod, setpaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    if (!shippingAddress){
        navigate('/shipping')
    }

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')

    }
  return (
<FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method:</Form.Label>
                <Col>
                    <Form.Check
                        type='radio'
                        label='PayPal or Credit Card'
                        id='paypal'
                        name='paymentMethod'
                        checked
                        onChange={e=> setpaymentMethod(e.target.value)}
                    >

                    </Form.Check>
                </Col>

            </Form.Group>
            

            <Button type='submit' variant='primary'>Continue</Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentPage