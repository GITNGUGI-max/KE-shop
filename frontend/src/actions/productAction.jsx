import {
     PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_REQUEST,
     PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_SUCCESS,
     PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_SUCCESS,
     PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_SUCCESS,
     PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_SUCCESS, 
     PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_SUCCESS, 
     PRODUCT_TOP_REQUEST,PRODUCT_TOP_FAIL, PRODUCT_TOP_SUCCESS,     
    } from "../constants/productConstants"
import axios from "axios"


export const listProducts = (query ='')=> async (dispatch)=>{

    try{

        dispatch({type:PRODUCT_LIST_REQUEST})

        const {data} = await axios.get(`http://127.0.0.1:8000/api/products${query}`)

        dispatch({
            type:PRODUCT_LIST_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({
            type:PRODUCT_LIST_FAIL,
            payload:error.response && error.response.data.detail 
            ? error.response.data.detail
            :error.message
        })
    }
}

export const topListedProducts = ()=> async (dispatch)=>{

    try{

        dispatch({type:PRODUCT_TOP_REQUEST})

        const {data} = await axios.get(`http://127.0.0.1:8000/api/products/top/`)

        dispatch({
            type:PRODUCT_TOP_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({
            type:PRODUCT_TOP_FAIL,
            payload:error.response && error.response.data.detail 
            ? error.response.data.detail
            :error.message
        })
    }
}

export const listProductsDetails = (id)=> async (dispatch)=>{

    try{

        dispatch({type:PRODUCT_DETAILS_REQUEST})

        const {data} = await axios.get(`http://127.0.0.1:8000/api/products/${id}`)

        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data
        })

    }catch(error){
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response && error.response.data.detail
            ? error.response.data.detail
            :error.message
        })
    }
}

export const deleteProduct = (id)=> async (dispatch, getState)=>{

    try{
        dispatch({
            type:PRODUCT_DELETE_REQUEST
        })

        const {userLogin:{userInfo}} = getState()

        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.delete(
            `http://localhost:8000/api/products/delete/${id}/`,
            config
            )
        
        dispatch(
            {
                type:PRODUCT_DELETE_SUCCESS,
           
            }
        )

        


    }catch(error){
        dispatch(
            {
                type:PRODUCT_DELETE_FAIL,
                payload: error.response && error.response.data.detail 
                        ? error.response.data.detail 
                        :error.message
            }
        )
    }
}

export const createProduct = ()=> async (dispatch, getState)=>{

    try{
        dispatch({
            type:PRODUCT_CREATE_REQUEST
        })

        const {userLogin:{userInfo}} = getState()

        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post(
            `http://localhost:8000/api/products/create/`,
            {},
            config
            )
        
        dispatch(
            {
                type:PRODUCT_CREATE_SUCCESS,
                payload:data
           
            }
        )

        


    }catch(error){
        dispatch(
            {
                type:PRODUCT_CREATE_FAIL,
                payload: error.response && error.response.data.detail 
                        ? error.response.data.detail 
                        :error.message
            }
        )
    }
}

export const updateProduct = (product)=> async (dispatch, getState)=>{

    try{
        dispatch({
            type:PRODUCT_UPDATE_REQUEST
        })

        const {userLogin:{userInfo}} = getState()

        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(
            `http://localhost:8000/api/products/update/${product._id}/`,
            product,
            config
            )
        
        dispatch(
            {
                type:PRODUCT_UPDATE_SUCCESS,
                payload:data
           
            }
        )

        dispatch(
            {
                type:PRODUCT_DETAILS_SUCCESS,
                payload:data
           
            }
        )

        


    }catch(error){
        dispatch(
            {
                type:PRODUCT_UPDATE_FAIL,
                payload: error.response && error.response.data.detail 
                        ? error.response.data.detail 
                        :error.message
            }
        )
    }
}


export const createProductReview = (id, review)=> async (dispatch, getState)=>{

    try{
        dispatch({
            type:PRODUCT_CREATE_REVIEW_REQUEST
        })

        const {userLogin:{userInfo}} = getState()

        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post(
            `http://localhost:8000/api/products/${id}/review/`,
            review,
            config
            )
        
        dispatch(
            {
                type:PRODUCT_CREATE_REVIEW_SUCCESS,
                payload:data
           
            }
        )



    }catch(error){
        dispatch(
            {
                type:PRODUCT_CREATE_REVIEW_FAIL,
                payload: error.response && error.response.data.detail 
                        ? error.response.data.detail 
                        :error.message
            }
        )
    }
}
