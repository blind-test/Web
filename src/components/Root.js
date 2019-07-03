import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Index from "./Index";
import App from "./App";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Profile from "./Profile";
import ThemesListing from "./ThemesListing";
import Theme from "./Theme";
import CreateTheme from "./CreateTheme";
import CreateMedia from "./CreateMedia";
// import ThemesListing from "./ThemesListing";
// import Theme from "./Theme";

const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <App>
                <Route exact path="/" component={Index}/>
                <Route exact path="/sign_in" component={SignIn}/>
                <Route exact path="/sign_up" component={SignUp}/>
                <Route exact path="/profile" component={Profile}/>
                <Route exact path="/themes" component={ThemesListing}/>
                <Switch>
                    <Route exact path="/theme/new" component={CreateTheme}/>
                    <Route exact path="/theme/:id" component={Theme}/>
                </Switch>
                <Switch>
                    <Route exact path={"/theme/:id/new"} component={CreateMedia} />
                </Switch>
            </App>
        </Router>
    </Provider>
)




Root.propTypes = {
    store: PropTypes.object.isRequired
}

export default Root