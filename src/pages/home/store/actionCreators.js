import * as actionTypes from './actionTypes'
// import axios from 'axios'
import http from 'utils/http'
import { MENU_URL } from 'config/config'

const initMenuData = data => ({
    type: actionTypes.INIT_MENU_DATA,
    payload: data
})

export const loadMenuData = () => {
    return dispatch => {
        http.get(MENU_URL).then(data => {
            dispatch(initMenuData(data))
        })
    }
}

// declared: sider toggle action function
export const siderToggle = {
    type: actionTypes.SIDER_TOGGLE,
    payload: {}
}
