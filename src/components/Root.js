import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router,Redirect,Route,Switch } from 'react-router-dom'
import Index from "./Index";
import App from "./App";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Profile from "./Profile";
import ThemesListing from "./ThemesListing";
import Theme from "./Theme";
// import ThemesListing from "./ThemesListing";
// import Theme from "./Theme";



const Root = ({ store }) =>  (
    <Provider store={store}>
        <Router>
            <App>
                <Route exact path="/" component={Index}/>
                <Route exact path="/sign_in" component={SignIn}/>
                <Route exact path="/sign_up" component={SignUp}/>
                <Route exact path="/profile" component={Profile}/>
                <Route exact path="/themes" component={ThemesListing}/>
                <Route exact path="/theme/:name" component={Theme}/>
            </App>
        </Router>
    </Provider>
)



Root.propTypes = {
    store: PropTypes.object.isRequired
}

export default Root