

export const initialState = {
    medias:{

    },
    themes:{

    },
    user:{
        email: '',
        nickname: '',
        password: ''
    },
    auth:{
        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.ju-Xskwi7AfFDoFa00HX20DVJmEBkJtzoONDQY16BpI"
    }
}
const DOMAIN = "192.168.56.101"
// const DOMAIN = "blind-test-api.herokuapp.com"
const ROOT_PATH = "/"
// https://blind-test-api.herokuapp.com/
const PROTOCOL = DOMAIN.includes("heroku") ? "https" : "http"
const PORT = PROTOCOL === "https" ? 443 : 3000
export const API_ROOT = `${PROTOCOL}://${DOMAIN}:${PORT}${ROOT_PATH}`