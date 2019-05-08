import * as actionTypes from './actionTypes'

const defaultState = {
    lists: []
}

export default (state = defaultState, action) => {
    let newState = JSON.parse(JSON.stringify(state))
    let value = action.payload
    switch (action.type) {
        case actionTypes.LIST_ITEM:
            newState.lists = value
            return newState
        case actionTypes.ADD_ITEM:
            if (state.lists.indexOf(value) === -1) {
                newState.lists.push(value)
            }
            return newState
        case actionTypes.DEL_ITEM:
            let filtered = state.lists.filter(v => {
                return v.toString() !== value.toString()
            })
            console.info('filtered--->', filtered)
            newState.lists = filtered
            return newState
        default:
            return newState
    }
}
