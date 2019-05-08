import * as actionTypes from './actionTypes'
// import axios from 'axios'
import http from 'utils/http'

/* const get = data => {
    return {
        type: actionTypes.GET_ITEM,
        payload: {
            data
        }
    }
} */

const list = value => ({
    type: actionTypes.LIST_ITEM,
    payload: value
})

export const loadList = () => {
    return dispatch => {
        http.get('/api/getDemoList').then(value => {
            dispatch(list(value))
        })
    }
}

export const add = value => ({
    type: actionTypes.ADD_ITEM,
    payload: value
})

export const del = value => ({
    type: actionTypes.DEL_ITEM,
    payload: value
})
