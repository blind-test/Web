import React, {Component, Fragment} from 'react'
import {Topbar} from "./Topbar";
import {connect} from "react-redux";
import {sign_in} from "../actions/userActions";
import {Redirect} from "react-router-dom";
import {Button, Cell, Grid} from "react-foundation";

class SignIn extends Component {
    constructor(props) {
        super(props)
        this.logIn = this.logIn.bind(this)
        this.updateEmail = this.updateEmail.bind(this)
        this.updatePassword = this.updatePassword.bind(this)
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
        this.props.dispatch(sign_in(JSON.stringify(payload)))
    }

    render() {
        const {auth} = this.props
        // if(auth.token && auth.token.length>0) window.location.href = "/home"
        return !auth.token ?
            <Fragment>

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