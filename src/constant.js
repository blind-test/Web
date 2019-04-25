

export const initialState = {
    user:{
        email: '',
        nickname: '',
        password: ''
    },
    auth:{
        jwt: ''
    }
}

const PROTOCOL = "http"
const PORT = 3000
const DOMAIN = "192.168.56.101"
const ROOT_PATH = "/"
export const API_ROOT = `${PROTOCOL}://${DOMAIN}:${PORT}${ROOT_PATH}`