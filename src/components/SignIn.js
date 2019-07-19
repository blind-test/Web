import React, {Component, Fragment} from 'react'
import {Topbar} from "./Topbar";
import {connect} from "react-redux";
import {sign_in} from "../actions/userActions";
import {Redirect} from "react-router-dom";

class SignIn extends Component{
    constructor(props){
        super(props)
        this.logIn = this.logIn.bind(this)
        this.updateEmail = this.updateEmail.bind(this)
        this.updatePassword = this.updatePassword.bind(this)
        this.state = {username: "", password: ""}
    }

    componentDidMount(){
    }

    updatePassword(event){
        this.setState({password: event.target.value})
    }

    updateEmail(event){
        this.setState({username: event.target.value})
    }

    logIn(event){
        event.preventDefault()
        const payload = {email:this.state.username, password:this.state.password}
        this.props.dispatch(sign_in(JSON.stringify(payload)))
    }

    render(){
        const {auth} = this.props
        // if(auth.token && auth.token.length>0) window.location.href = "/home"
        return !auth.token ?
            <Fragment>

                <form method={"post"} onSubmit={this.logIn} >
                        <div className={"grid-x grid-padding-x"}>
                            <div className={"medium-6 small-12 cell"}>
                                <label>Email
                                    <input type={"text"} name={"email"} value={this.state.username} onChange={this.updateEmail} />
                                </label>
                            </div>
                            <div className={"medium-6 small-12 cell"}>
                                <label>Password
                                    <input type="password" name={"password"} value={this.state.password} onChange={this.updatePassword} />
                                </label>
                            </div>
                            <div className={"medium-6 small-12 cell"}>
                                <button className={"button"} type={"submit"} >Sign In</button>
                            </div>
                        </div>
                </form>
            </Fragment>
        : <Redirect to={"/"} />
    }
}

function mapStateToProps(state, ownProps){
    console.log("mapStateToProps: SignIn");
    return {
        auth: state.app.auth,

    };
}

export default connect(mapStateToProps)(SignIn)