import fetch from 'cross-fetch'
import {API_ROOT} from "../constant";

export const REQUEST_READ_THEME = "REQUEST_READ_THEME"
export const RECEIVE_READ_THEME = "RECEIVE_READ_THEME"
export const REQUEST_READ_ALL_THEME = "REQUEST_READ_ALL_THEME"
export const RECEIVE_READ_ALL_THEME = "RECEIVE_READ_ALL_THEME"
export const REQUEST_CREATE_THEME = "REQUEST_CREATE_THEME"
export const RECEIVE_CREATE_THEME = "RECEIVE_CREATE_THEME"
export const REQUEST_UPDATE_THEME = "REQUEST_UPDATE_THEME"
export const RECEIVE_UPDATE_THEME = "RECEIVE_UPDATE_THEME"
export const REQUEST_DELETE_THEME = "REQUEST_DELETE_THEME"
export const RECEIVE_DELETE_THEME = "RECEIVE_DELETE_THEME"

function request_create_theme(payload){
    return {
        type: REQUEST_CREATE_THEME,
        payload:payload
    }
}

function receive_create_theme(payload){
    return {
        type: RECEIVE_CREATE_THEME,
        payload:payload
    }
}

export function create_theme(payload, token, callback = message => {}){
    return dispatch => {
        dispatch(request_create_theme(payload))
        return fetch(`${API_ROOT}themes`,{
            method:"POST",
            mode:"cors",
            cache: "no-cache",
            headers: {
                "Content-Type":"application/json;charset=UTF-8",
                "JWT":token
            } ,
            body:JSON.stringify(payload)
        })
        .then(
            response => {
                if( response.ok)
                    return response.json()
                else
                    throw response.text()
            })
        .then(json =>{
                dispatch(receive_create_theme(json))
            callback()
        })
        .catch(error=> {
            console.error("error",error)
            callback("Theme creation wasn't successful")
        })
    }
}

function request_update_theme(payload){
    return {
        type: REQUEST_UPDATE_THEME,
        payload: payload
    }
}

function receive_update_theme(payload){
    return {
        type: RECEIVE_UPDATE_THEME,
        payload: payload
    }
}


export function update_theme(payload, id, token, callback = message => {}){
    return dispatch => {
        dispatch(request_update_theme(payload))
        return fetch(`${API_ROOT}themes/${id}`,{
            method:"PUT",
            mode:"cors",
            cache: "no-cache",
            headers: {
                "Content-Type":"application/json;charset=UTF-8",
                "JWT":token
            } ,
            body:payload
        })
            .then(
                response => response.json())
            .then(json =>{
                if(!json.error)
                    dispatch(receive_update_theme(json))
                else
                    console.error("json_error", json.error);
            })
            .catch(error=> console.error("error",error)
            )
    }
}

function request_delete_theme(payload){
    return {
        type:REQUEST_DELETE_THEME,
        payload:payload
    }
}

function receive_delete_theme(payload){
    return {
        type:RECEIVE_DELETE_THEME,
        payload:payload
    }
}


export function delete_theme(payload, id, token){
    return dispatch => {
        dispatch(request_delete_theme(payload))
        return fetch(`${API_ROOT}themes/${id}`,{
            method:"DELETE",
            mode:"cors",
            cache: "no-cache",
            headers: {
                "Content-Type":"application/json;charset=UTF-8",
                "JWT":token
            } ,
        })
            .then(
                response => response.text())
            .then(text =>{
                    dispatch(receive_delete_theme(id))
            })
            .catch(error=> console.error("error",error)
            )
    }
}

function request_read_theme(payload){
    return {
        type: REQUEST_READ_THEME,
        payload: payload
    }
}

function receive_read_theme(payload){
    return {
        type: RECEIVE_READ_THEME,
        payload: payload
    }
}

export function read_theme(id, token){

    return dispatch => {
        dispatch(request_read_theme(id))
        return fetch(`${API_ROOT}themes/${id}`,{
            method:"GET",
            mode:"cors",
            cache: "no-cache",
            headers: {
                "Content-Type":"application/json;charset=UTF-8",
                "JWT":token
            } ,
        })
            .then(
                response => response.json())
            .then(json =>{
                if(!json.error)
                    dispatch(receive_read_theme(json))
                else
                    console.error("json_error", json.error);
            })
            .catch(error=> console.error("error",error)
            )
    }
}

function request_read_all_themes(){
    return {
        type: REQUEST_READ_ALL_THEME,
        payload:undefined
    }
}

function receive_read_all_themes(payload){
    return {
        type: RECEIVE_READ_ALL_THEME,
        payload:payload
    }
}

export function read_themes(token){

    return dispatch => {
        dispatch(request_read_all_themes())
        return fetch(`${API_ROOT}themes`,{
            method:"GET",
            mode:"cors",
            cache: "no-cache",
            headers: {
                "Accept": 'application/json',
                "Content-Type":"application/json;charset=UTF-8",
                "JWT":token
            } ,
        })
            .then(
                response => response.json())
            .then(json =>{
                if(!json.error)
                    dispatch(receive_read_all_themes(json))
                else
                    console.error("json_error", json.error);
            })
            .catch(error=> console.error("error",error)
            )
    }
}