import fetch from 'cross-fetch'
import {API_ROOT} from "../constant";

export const REQUEST_READ_MEDIA = "REQUEST_READ_MEDIA"
export const RECEIVE_READ_MEDIA = "RECEIVE_READ_MEDIA"
export const REQUEST_READ_ALL_MEDIA = "REQUEST_READ_ALL_MEDIA"
export const RECEIVE_READ_ALL_MEDIA = "RECEIVE_READ_ALL_MEDIA"
export const REQUEST_CREATE_MEDIA = "REQUEST_CREATE_MEDIA"
export const RECEIVE_CREATE_MEDIA = "RECEIVE_CREATE_MEDIA"
export const REQUEST_UPDATE_MEDIA = "REQUEST_UPDATE_MEDIA"
export const RECEIVE_UPDATE_MEDIA = "RECEIVE_UPDATE_MEDIA"
export const REQUEST_DELETE_MEDIA = "REQUEST_DELETE_MEDIA"
export const RECEIVE_DELETE_MEDIA = "RECEIVE_DELETE_MEDIA"

function request_create_media(payload){
    return {
        type: REQUEST_CREATE_MEDIA,
        payload:payload
    }
}

function receive_create_media(payload){
    return {
        type: RECEIVE_CREATE_MEDIA,
        payload:payload
    }
}

export function create_media(payload, idTheme, token){
    return dispatch => {
        dispatch(request_create_media(payload))
        return fetch(`${API_ROOT}themes/${idTheme}/medias`,{
            method:"POST",
            mode:"cors",
            cache: "no-cache",
            headers: {
                "JWT":token
            } ,
            body:payload
        })
        .then(
            response => response.json())
        .then(json =>{
            if(!json.error)
                dispatch(receive_create_media(json))
            else
                throw json
        })
        .catch(error=> console.error("error",error)
        )
    }
}

function request_update_media(payload){
    return {
        type: REQUEST_UPDATE_MEDIA,
        payload: payload
    }
}

function receive_update_media(payload){
    return {
        type: RECEIVE_UPDATE_MEDIA,
        payload: payload
    }
}


export function update_media(payload, idTheme, idMedia, token){
    return dispatch => {
        dispatch(request_update_media(payload))
        return fetch(`${API_ROOT}themes/${idTheme}/medias/${idMedia}`,{
            method:"PUT",
            mode:"cors",
            cache: "no-cache",
            headers: {
                "Content-Type":"application/json;charset=UTF-8",
                "JWT":token
            },
            body:payload
        })
            .then(
                response => response.json())
            .then(json =>{
                if(!json.error)
                    dispatch(receive_update_media(json))
                else
                    throw json
            })
            .catch(error=> console.error("error",error)
            )
    }
}

function request_delete_media(payload){
    return {
        type:REQUEST_DELETE_MEDIA,
        payload:payload
    }
}

function receive_delete_media(payload){
    return {
        type:RECEIVE_DELETE_MEDIA,
        payload:payload
    }
}


export function delete_media(idTheme, idMedia, token){
    return dispatch => {
        dispatch(request_delete_media(undefined))
        return fetch(`${API_ROOT}themes/${idTheme}/medias/${idMedia}`,{
            method:"DELETE",
            mode:"cors",
            cache: "no-cache",
            headers: {
                "Content-Type":"application/json;charset=UTF-8",
                "JWT":token
            },
            body: JSON.stringify("")
        })
            .then(
                response => response.text())
            .then(text =>{
                    dispatch(receive_delete_media(idMedia))
            })
            .catch(error=> console.error("error",error)
            )
    }
}

function request_read_media(payload){
    return {
        type: REQUEST_READ_MEDIA,
        payload: payload
    }
}

function receive_read_media(payload){
    return {
        type: RECEIVE_READ_MEDIA,
        payload: payload
    }
}

export function read_media(idTheme, idMedia, token){

    return dispatch => {
        dispatch(request_read_media(id))
        return fetch(`${API_ROOT}themes/${idTheme}/medias/${idMedia}`,{
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
                    dispatch(receive_read_media(json))
                else
                    throw json
            })
            .catch(error=> console.error("error",error)
            )
    }
}

function request_read_all_medias(){
    return {
        type: REQUEST_READ_ALL_MEDIA,
        payload:undefined
    }
}

function receive_read_all_medias(payload){
    return {
        type: RECEIVE_READ_ALL_MEDIA,
        payload:payload
    }
}

export function read_medias(idTheme,token){

    return dispatch => {
        dispatch(request_read_all_medias())
        return fetch(`${API_ROOT}themes/${idTheme}/medias`,{
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
                    dispatch(receive_read_all_medias(json))
                else
                    console.error("json_error", json.error);
            })
            .catch(error=> console.error("error",error)
            )
    }
}