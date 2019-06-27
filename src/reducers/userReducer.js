import {combineReducers} from 'redux'
import {
    REQUEST_SIGN_IN,
    RECEIVE_SIGN_IN,
    REQUEST_SIGN_OUT,
    RECEIVE_SIGN_OUT,
    REQUEST_SIGN_UP,
    RECEIVE_SIGN_UP
} from '../actions/userActions'
import {initialState} from '../constant'
import {RECEIVE_CREATE_THEME, RECEIVE_READ_THEME} from "../actions/themeActions";



function sign_in(state = {}, action){

    return Object.assign({},state,{
        auth:{token:action.payload.token}
    })

}
function sign_out(state = {}, action){
    return Object.assign({},state,{
        auth:{token:undefined}
    })
}
function sign_up(state = {}, action){
    console.table(action.payload);
    return Object.assign({},state,{
        user: action.payload
    })
}

function add_theme(state = {}, action){
    const id = action.payload.id
    return Object.assign({}, state, {
        id:action.payload
    })
}

function app(state = initialState, action){
    switch (action.type) {
        case RECEIVE_SIGN_IN:
            return sign_in(state, action)
        case RECEIVE_SIGN_UP:
            return sign_up(state, action)
        case RECEIVE_SIGN_OUT:
            return sign_out(state, action)
        case RECEIVE_CREATE_THEME:
        case RECEIVE_READ_THEME:
            return create_theme(state.themes,action)
        default:
            return state
    }
}

const userReducer = combineReducers({
    app
})

export default userReducer