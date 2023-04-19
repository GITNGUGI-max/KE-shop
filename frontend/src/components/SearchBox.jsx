import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'

const SearchBox = () => {

    let [searchParams, setSearchParams] = useSearchParams();
    let [query, setQuery] = useState(
      searchParams.get("query")
    );


    function handleSubmit() {
        setSearchParams({ query });
      }


  return (
    <Form className='search' onSubmit={handleSubmit} >

        <Form.Control
            type='text'
            name='query'
            onChange={setQuery}
            className='mr-sm-2 ml-sm-5'
        >

        </Form.Control>

        <Button
            type='submit'
            variant='outline-success'
            className='p-2'
        >
            Search
        </Button>

    </Form>
  )
}

export default SearchBox