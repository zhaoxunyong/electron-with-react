import React from 'react'
import axios from 'axios'
import { message, notification } from 'antd'
import { DEV_BACKEND_SERVER_URL, WITH_CREDENTIALS } from 'config/development'

let root = ''
if (process.env.NODE_ENV === 'development') {
    root = DEV_BACKEND_SERVER_URL
    console.log('current mode is development, remote backend server url is ' + root)
}

axios.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

/**
 * axios interceptors
 */
axios.interceptors.response.use(
    response => {
        // console.log('response...' + response)
        if (response.request.responseURL !== undefined && response.request.responseURL !== '' && response.request.responseURL.indexOf('/cas/login') !== -1) {
            window.location.href = response.request.responseURL
        } else {
            return response
        }
    },
    error => {
        return Promise.reject(error)
    }
)

/*
 *  fileUpload
 */
function fileUpload(file, url) {
    return new Promise((resolve, reject) => {
        const param = new FormData() // 创建form对象
        param.append('file', file, file.name) // 通过append向form对象添加数据
        param.append('chunk', '0') // 添加form表单中其他数据
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        }
        axios
            .post(url, param, config)
            .then(response => {
                if (response.data.code === 200 || response.data.code === 304) {
                    resolve(response.data)
                } else {
                    // 由后端抛出的错误
                    showBusinessError(url, response)
                    reject(response.data.data.error)
                    // throw response.data.message
                }
            })
            .catch(error => {
                // 由网络或者服务器抛出的错误
                message.error(error)
            })
    })
}

/**
 * axios common api
 */
function apiAxios(method, url, params) {
    let ajaxObj = {
        method: method,
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        },
        url: url,
        data: method === 'POST' || method === 'PUT' ? params : null,
        params: method === 'GET' || method === 'DELETE' ? params : null
        // baseURL: root
    }
    if (url.startsWith('http://') || url.startsWith('https://')) {
        ajaxObj['withCredentials'] = false
    } else {
        ajaxObj['baseURL'] = root
        // dev enviroment
        if (process.env.NODE_ENV === 'development') {
            ajaxObj['withCredentials'] = WITH_CREDENTIALS
        } else {
            ajaxObj['withCredentials'] = true
        }
    }
    /** 
    error response example:
    data:
      code: 500
      data:
        error: "Not Found"
        message: "No message available"
        path: "/api/user/getLoginUsers"
        status: 404
        timestamp: 1554713327557 
    */
    return new Promise((resolve, reject) => {
        // https://www.mmxiaowu.com/article/589af8cde9be1c5b21ef8e9c
        axios(ajaxObj)
            .then(function(response) {
                if (response.data.code === undefined) {
                    // mock api doesn't return the data.code
                    if (response.data.errcode) {
                        message.error(response.data.errmsg)
                    } else {
                        resolve(response.data)
                    }
                } else if (response.data.code === 200 || response.data.code === 304) {
                    resolve(response.data)
                } else {
                    showBusinessError(url, response)
                    reject(response.data.data.error)
                    // throw response.data.message
                }
            })
            .catch(error => {
                // 由网络或者服务器抛出的错误
                showSystemError(url, error)
            })
    })
}

/**
 * 服务器返回错误时的UI显示
 */
function showBusinessError(url, response) {
    // 由后端抛出的错误
    const title = (
        <span
            style={{
                color: 'red'
            }}
        >
            Opps!
        </span>
    )
    const msg = (
        <div
            style={{
                color: 'red'
            }}
        >
            status: {response.data.data.status}
            <br />
            error: {response.data.data.error}
            <br />
            message: {response.data.data.message}
            <br />
            url: {url}
        </div>
    )
    notification.open({
        message: title,
        description: msg
    })
}

/**
 * 服务器返回系统错误
 */
function showSystemError(url, error) {
    console.error('Calling ' + url + ' exception:\n' + error)
}

export default {
    get(url, params, success, failure) {
        return apiAxios('GET', url, params, success, failure)
    },
    post(url, params, success, failure) {
        return apiAxios('POST', url, params, success, failure)
    },
    put(url, params, success, failure) {
        return apiAxios('PUT', url, params, success, failure)
    },
    delete(url, params, success, failure) {
        return apiAxios('DELETE', url, params, success, failure)
    },
    fileUpload(file, url, success, failure) {
        return fileUpload(file, url, success, failure)
    }
}
