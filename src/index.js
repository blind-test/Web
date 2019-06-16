import React from "react";
import ReactDOM from "react-dom";
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {applyMiddleware, createStore} from 'redux'
import userReducer from './reducers/userReducer'
import {sign_up,sign_in,sign_out} from "./actions/userActions";
import Root from "./components/Root";
const loggerMiddleware = createLogger()
const store = createStore(
    userReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
)

const Index = () => {
    return <div>Hello React!</div>;
};



ReactDOM.render(
    <Root store={store} />,
    document.getElementById("root")
);


// Log the initial state
console.log(store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() => console.log(store.getState()))

const payload_up = {
    email:"gogo@email.fr",
    nickname:"gogo",
    password:"123456789",
    password_confirmation:"123456789"

},
    payload_in = {
    email:"gogo@email.fr",
    password:"123456789"

}

// Dispatch some actions
// store.dispatch(sign_up( JSON.stringify(payload_up) ))
store.dispatch(sign_in( JSON.stringify(payload_in) ))
// setTimeout(
//     () => store.dispatch(sign_out( JSON.stringify() ))
//     ,2000
// )


// Stop listening to state updates
unsubscribe()


