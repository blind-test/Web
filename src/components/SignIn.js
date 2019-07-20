import React, {Component, Fragment} from 'react'
import {Topbar} from "./Topbar";
import {connect} from "react-redux";
import {sign_in} from "../actions/userActions";
import {Redirect} from "react-router-dom";
import {Button, Callout, Cell, Grid, Colors} from "react-foundation";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons/index";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";

class SignIn extends Component {
    constructor(props) {
        super(props)
        this.logIn = this.logIn.bind(this)
        this.updateEmail = this.updateEmail.bind(this)
        this.updatePassword = this.updatePassword.bind(this)
        this.redirectAfterLogin = this.redirectAfterLogin.bind(this)
        this.logInFailed = this.logInFailed.bind(this)
        this.state = {username: "", password: ""}
    }

    componentDidMount() {
    }

    updatePassword(event) {
        this.setState({password: event.target.value})
    }

    updateEmail(event) {
        this.setState({username: event.target.value})
    }

    logIn(event) {
        event.preventDefault()
        const payload = {email: this.state.username, password: this.state.password}
        const callback = message => message ? this.logInFailed(message) : this.redirectAfterLogin()
        this.props.dispatch(sign_in(JSON.stringify(payload), callback))
    }

    logInFailed(message){
        this.setState({message: message})
    }

    redirectAfterLogin(){
        this.props.history.push("/themes")
    }

    render() {
        const {auth} = this.props
        // if(auth.token && auth.token.length>0) window.location.href = "/home"
        return !auth.token ?
            <Fragment>
                { this.state.message ?
                    <Callout color={Colors.ALERT}>
                        <h5 style={{color:"darkred"}}><FontAwesomeIcon icon={faExclamationTriangle}/>Authentification failed</h5>
                        <p>{this.state.message}</p>
                    </Callout>
                    : ""
                }
                <form method={"post"} onSubmit={this.logIn}>
                    <Grid gutters={"padding"}>
                        <Cell className={"input-field"} small={12} medium={6}>
                            <input type={"text"} name={"email"} value={this.state.username} required
                                   onChange={this.updateEmail}/>
                            <label>Email</label>

                        </Cell>
                        <Cell className={"input-field"} small={12} medium={6}>
                            <input type="password" name={"password"} value={this.state.password} required
                                   onChange={this.updatePassword}/>
                            <label>Password</label>
                        </Cell>
                        <Cell small={12} medium={12}>
                            <Button type={"submit"}>Sign In</Button>
                        </Cell>
                    </Grid>
                </form>
            </Fragment>
            : <Redirect to={"/"}/>
    }
}

function mapStateToProps(state, ownProps) {
    console.log("mapStateToProps: SignIn");
    return {
        auth: state.app.auth,

    };
}

export default connect(mapStateToProps)(SignIn)