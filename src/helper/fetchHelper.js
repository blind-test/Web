import {API_ROOT} from "../constant";
import fetch from "cross-fetch";


export const GET = (payload,path, token) => {

    return fetch(`${API_ROOT}${path}`,{
        method:"GET",
        mode:"cors",
        cache: "no-cache",
        headers: {
            "Content-Type":"application/json;charset=UTF-8",

        }
    })
}

export const POST = (payload,path, token) => {

    return fetch(`${API_ROOT}${path}`,{
        method:"GET",
        mode:"cors",
        cache: "no-cache",
        headers: {
            "Content-Type":"application/json;charset=UTF-8",

        }
    })
}