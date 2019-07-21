

export const initialState = {
    questions:{

    },
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
        token: undefined
    }
}
// const DOMAIN = "192.168.56.101"
const DOMAIN = "blind-test-api.herokuapp.com"
const ROOT_PATH = "/"
const PROTOCOL = DOMAIN.includes("heroku") ? "https" : "http"
const PORT = PROTOCOL === "https" ? 443 : 3000
export const API_ROOT = `${PROTOCOL}://${DOMAIN}:${PORT}${ROOT_PATH}`