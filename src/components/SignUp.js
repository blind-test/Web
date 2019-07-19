import React, {Component, Fragment} from 'react'
import {Topbar} from "./Topbar";
import {connect} from "react-redux";
import {sign_in, sign_up} from "../actions/userActions";
import {Button, Cell, Grid} from "react-foundation";

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.signUp = this.signUp.bind(this)
        this.updateEmail = this.updateEmail.bind(this)
        this.updatePassword = this.updatePassword.bind(this)
        this.updatePasswordConfirm = this.updatePasswordConfirm.bind(this)
        this.updateUsername = this.updateUsername.bind(this)
        this.state = {username: "", password: "", password_confirmation: "", email: ""}
    }

    componentDidMount() {
    }

    signUp(event) {
        event.preventDefault()
        const payload = this.state
        console.table(payload)
        this.props.dispatch(sign_up(JSON.stringify(payload)))
    }

    updateUsername(event) {
        this.setState({username: event.target.value})
    }

    updatePassword(event) {
        this.setState({password: event.target.value})
    }

    updatePasswordConfirm(event) {
        this.setState({password_confirmation: event.target.value})
    }

    updateEmail(event) {
        this.setState({email: event.target.value})
    }

    render() {
        return (
            <Fragment>

                <form method={"post"} onSubmit={this.signUp}>
                    <Grid gutters={"padding"}>
                        <Cell className={"input-field"} small={12} medium={6}>
                            <input type={"text"} name={"username"} onChange={this.updateUsername} required
                                   value={this.state.username}/>
                            <label>Username</label>

                        </Cell>
                        <Cell className={"input-field"} small={12} medium={6}>
                            <input type={"text"} name={"email"} onChange={this.updateEmail} value={this.state.email}
                                   required/>
                            <label>Email</label>
                        </Cell>
                        <Cell className={"input-field"} small={12} medium={6}>
                            <input type="password" name={"password"} onChange={this.updatePassword} required
                                   value={this.state.password}/>
                            <label>Password</label>
                        </Cell>
                        <Cell className={"input-field"} small={12} medium={6}>
                            <input type="password" name={"password_confirmation"} onChange={this.updatePasswordConfirm}
                                   required
                                   value={this.state.password_confirmation}/>
                            <label>Password Confirmation</label>
                        </Cell>
                        <Cell small={12}>
                        </Cell>

                        <Cell small={12}>
                            <a href={"/privacy-policy"} target="_blank">See our policy</a><br/>
                            <Button type={"submit"} style={{marginTop: "0.5rem"}}>Sign Up</Button>
                        </Cell>
                    </Grid>
                </form>
            </Fragment>
        )
    }
}

function mapStateToProps(state, ownProps) {
    console.log("mapStateToProps: SignUp");
    return {}
}

export default connect(mapStateToProps)(SignUp)