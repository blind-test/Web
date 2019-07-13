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
import {
    RECEIVE_CREATE_THEME, RECEIVE_DELETE_THEME,
    RECEIVE_READ_ALL_THEME,
    RECEIVE_READ_THEME,
    RECEIVE_UPDATE_THEME
} from "../actions/themeActions";
import {RECEIVE_DELETE_MEDIA, RECEIVE_READ_ALL_MEDIA} from "../actions/mediaAction";
import {
    RECEIVE_CREATE_QUESTION,
    RECEIVE_DELETE_QUESTION,
    RECEIVE_READ_ALL_QUESTION,
    RECEIVE_UPDATE_QUESTION
} from "../actions/questionAction";



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
        themes: {
            ...state.themes,
            [id]: action.payload

        }
    })
}

function add_themes(state = {}, action){
    const themes = {}
    action.payload.map(theme => themes[theme.id] = theme);
    console.log("reducer themes",themes);
    return {...state, themes:themes}
}

function add_medias(state = {}, action){
    const medias = {}
    const theme = action.payload.count > 0 ? action.payload[0] : undefined

    action.payload.map(media => medias[media.id] = media);
    console.log("reducer medias",medias);

    return {...state, medias:medias  }
}

function add_question(state = {}, action){
    const id = action.payload.id
    return Object.assign({}, state, {
        questions: {
            ...state.questions,
            [id]: action.payload

        }
    })
}

function remove_theme(state = {}, action){
    const themes = {...state.themes}
    delete themes[action.payload]
    return {...state, themes:themes}
}

function remove_media(state = {}, action){
    const medias = {...state.medias}
    delete medias[action.payload]
    return {...state, medias:medias}
}

function remove_question(state = {}, action){
    const questions = {...state.questions}
    delete questions[action.payload]
    return {...state, questions:questions}
}

function add_questions(state = {}, action){
    const questions = {}
    action.payload.map(question => questions[question.id] = question)
    return {...state,questions:questions}
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
        case RECEIVE_UPDATE_THEME:
        case RECEIVE_READ_THEME:
            return add_theme(state,action)
        case RECEIVE_READ_ALL_THEME:
            return add_themes(state,action)
        case RECEIVE_DELETE_THEME:
            return remove_theme(state,action)
        case RECEIVE_DELETE_MEDIA:
            return remove_media(state,action)
        case RECEIVE_READ_ALL_MEDIA:
            return add_medias(state,action)
        case RECEIVE_DELETE_QUESTION:
            return remove_question(state,action)
        case RECEIVE_UPDATE_QUESTION:
        case RECEIVE_CREATE_QUESTION:
            return add_question(state,action)
        case RECEIVE_READ_ALL_QUESTION:
            return add_questions(state,action)
        default:
            return state
    }
}

const userReducer = combineReducers({
    app
})

export default userReducer