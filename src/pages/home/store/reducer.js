import * as actionTypes from './actionTypes'
import * as routerMapping from 'config/router'

const defaultState = {
    menuData: [],
    routes: [],
    activeTab: '欢迎页'
}

const getCompoment = path => {
    for (let key in routerMapping.mapping) {
        let item = routerMapping.mapping[key]
        if (path === item.path) {
            return item.component
        }
    }
    return null
}

const transferRouter = (menuData, routes = []) => {
    menuData.map(item => {
        if (item.children && item.children.length > 0) {
            transferRouter(item.children, routes)
            return null
        }
        let component = getCompoment(item.url)
        if (component !== null) {
            routes.push({
                path: item.url,
                component: component,
                name: item.text
            })
        }
        return null
    })
    return routes
}

export default (state = defaultState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case actionTypes.INIT_MENU_DATA:
            newState.menuData = action.payload
            let routes = transferRouter(action.payload, []).concat(routerMapping.extra)
            newState.routes = routes
            return newState
        case actionTypes.SIDER_TOGGLE:
            newState.collapsed = !state.collapsed
            return newState
        default:
            return newState
    }
}
