import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import { Nav } from 'react-bootstrap'

const CheckoutSteps = ({step1, step2, step3, step4}) => {
  return (
   <Nav>
    {
        step1 ?
        (<LinkContainer to='/login'>
            <Nav.Link>
                Login
            </Nav.Link>
        </LinkContainer>)
        :(
            <Nav.Link disabled>Login</Nav.Link>
        )
     }

         {
        step2 ?
        (<LinkContainer to='/shipping'>
            <Nav.Link>
                Shipping
            </Nav.Link>
        </LinkContainer>)
        :(
            <Nav.Link disabled>Shipping</Nav.Link>
        )
     }
         {
        step3 ?
        (<LinkContainer to='/payment'>
            <Nav.Link>
                Payment
            </Nav.Link>
        </LinkContainer>)
        :(
            <Nav.Link disabled>Payment</Nav.Link>
        )
     }
    {
        step4 ?
        (<LinkContainer to='/place-order'>
            <Nav.Link>
                Place Order
            </Nav.Link>
        </LinkContainer>)
        :(
            <Nav.Link disabled>Place Order</Nav.Link>
        )
     }
   </Nav>
  )
}

export default CheckoutSteps