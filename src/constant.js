

export const initialState = {
    user:{
        email: '',
        nickname: '',
        password: ''
    },
    auth:{
        token: '5'
    }
}
// https://blind-test-api.herokuapp.com/
const PROTOCOL = "http"
const PORT = PROTOCOL === "https" ? 443 : 80
// const PORT = 3000
// const DOMAIN = "192.168.56.101"
const DOMAIN = "blind-test-api.herokuapp.com"
const ROOT_PATH = "/"
export const API_ROOT = `${PROTOCOL}://${DOMAIN}:${PORT}${ROOT_PATH}`