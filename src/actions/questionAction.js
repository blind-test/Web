import fetch from 'cross-fetch'
import {API_ROOT} from "../constant";

export const REQUEST_READ_QUESTION = "REQUEST_READ_QUESTION"
export const RECEIVE_READ_QUESTION = "RECEIVE_READ_QUESTION"
export const REQUEST_READ_ALL_QUESTION = "REQUEST_READ_ALL_QUESTION"
export const RECEIVE_READ_ALL_QUESTION = "RECEIVE_READ_ALL_QUESTION"
export const REQUEST_CREATE_QUESTION = "REQUEST_CREATE_QUESTION"
export const RECEIVE_CREATE_QUESTION = "RECEIVE_CREATE_QUESTION"
export const REQUEST_UPDATE_QUESTION = "REQUEST_UPDATE_QUESTION"
export const RECEIVE_UPDATE_QUESTION = "RECEIVE_UPDATE_QUESTION"
export const REQUEST_DELETE_QUESTION = "REQUEST_DELETE_QUESTION"
export const RECEIVE_DELETE_QUESTION = "RECEIVE_DELETE_QUESTION"

function request_create_question(payload){
    return {
        type: REQUEST_CREATE_QUESTION,
        payload:payload
    }
}

function receive_create_question(payload){
    return {
        type: RECEIVE_CREATE_QUESTION,
        payload:payload
    }
}

export function create_question(payload, idMedia, token){
    return dispatch => {
        dispatch(request_create_question(payload))
        return fetch(`${API_ROOT}medias/${idMedia}/questions`,{
            method:"POST",
            mode:"no-cors",
            cache: "no-cache",
            headers: {
                "Content-Type":"application/json;charset=UTF-8",
                "JWT":token
            } ,
            body:JSON.stringify(payload)
        })
        .then(
            response => response.json())
        .then(json =>{
            if(!json.error)
                dispatch(receive_create_question(json))
            else
                throw json
        })
        .catch(error=> console.error("error",error)
        )
    }
}

function request_update_question(payload){
    return {
        type: REQUEST_UPDATE_QUESTION,
        payload: payload
    }
}

function receive_update_question(payload){
    return {
        type: RECEIVE_UPDATE_QUESTION,
        payload: payload
    }
}


export function update_question(payload, idQuestion, idMedia, token){
    return dispatch => {
        dispatch(request_update_question(payload))
        return fetch(`${API_ROOT}medias/${idMedia}/questions/${idQuestion}`,{
            method:"PUT",
            mode:"cors",
            cache: "no-cache",
            headers: {
                "Content-Type":"application/json;charset=UTF-8",
                "JWT":token
            },
            body:JSON.stringify(payload)
        })
            .then(
                response => response.json())
            .then(json =>{
                if(!json.error)
                    dispatch(receive_update_question(json))
                else
                    throw json
            })
            .catch(error=> console.error("error",error)
            )
    }
}

function request_delete_question(payload){
    return {
        type:REQUEST_DELETE_QUESTION,
        payload:payload
    }
}

function receive_delete_question(payload){
    return {
        type:RECEIVE_DELETE_QUESTION,
        payload:payload
    }
}


export function delete_question(idMedia, idQuestion, token){
    return dispatch => {
        dispatch(request_delete_question(undefined))
        return fetch(`${API_ROOT}medias/${idMedia}/questions/${idQuestion}`,{
            method:"DELETE",
            mode:"cors",
            cache: "no-cache",
            headers: {
                "Content-Type":"application/json;charset=UTF-8",
                "JWT":token
            }
        })
            .then(
                response => response.text())
            .then(text =>{
                    dispatch(receive_delete_question(idQuestion))
            })
            .catch(error=> console.error("error",error)
            )
    }
}

function request_read_question(payload){
    return {
        type: REQUEST_READ_QUESTION,
        payload: payload
    }
}

function receive_read_question(payload){
    return {
        type: RECEIVE_READ_QUESTION,
        payload: payload
    }
}

export function read_question(idMedia, idQuestion, token){

    return dispatch => {
        dispatch(request_read_question(id))
        return fetch(`${API_ROOT}medias/${id}/questions/${idQuestion}`,{
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
                    dispatch(receive_read_question(json))
                else
                    console.error("json_error", json.error);
            })
            .catch(error=> console.error("error",error)
            )
    }
}

function request_read_all_questions(){
    return {
        type: REQUEST_READ_ALL_QUESTION,
        payload:undefined
    }
}

function receive_read_all_questions(payload){
    return {
        type: RECEIVE_READ_ALL_QUESTION,
        payload:payload
    }
}

export function read_questions(id,token){

    return dispatch => {
        dispatch(request_read_all_questions())
        return fetch(`${API_ROOT}medias/${id}/questions`,{
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
                    dispatch(receive_read_all_questions(json))
                else
                    console.error("json_error", json.error);
            })
            .catch(error=> console.error("error",error)
            )
    }
}