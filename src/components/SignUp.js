import React, {Component, Fragment} from 'react'
import {Topbar} from "./Topbar";
import {connect} from "react-redux";
import {sign_in, sign_up} from "../actions/userActions";

class SignUp extends Component{
    constructor(props){
        super(props)
        this.signUp = this.signUp.bind(this)
    }

    componentDidMount(){
        console.log("SignUp mounted");
    }

    signUp(event){
        event.preventDefault()
        console.log(event.target)
        const form = event.target
        const username = form.querySelector('[name="username"]').value
        const password = form.querySelector('[name="password"]').value
        const password_confirmation = form.querySelector('[name="password_confirmation"]').value
        const email = form.querySelector('[name="email"]').value
        const payload = {email:email, nickname:username, password:password, password_confirmation:password_confirmation}
        console.table(payload)
        this.props.dispatch(sign_up(JSON.stringify(payload)))
    }

    render(){
        return (
            <Fragment>

                <form method={"post"} onSubmit={this.signUp} >
                        <div className={"grid-x grid-padding-x"}>
                            <div className={"medium-6 small-12 cell"}>
                                <label>Username
                                    <input type={"text"} name={"username"} />
                                </label>
                            </div>
                            <div className={"medium-6 small-12 cell"}>
                                <label>Email
                                    <input type={"text"} name={"email"} />
                                </label>
                            </div>
                            <div className={"medium-6 small-12 cell"}>
                                <label>Password
                                    <input type="password" name={"password"}/>
                                </label>
                            </div>
                            <div className={"medium-6 small-12 cell"}>
                                <label>Password Confirmation
                                    <input type="password" name={"password_confirmation"}/>
                                </label>
                            </div>
                            <div className={"medium-6 small-12 cell"}>
                                <button className={"button"} type={"submit"} >Sign Up</button>
                            </div>
                        </div>
                </form>
            </Fragment>
        )
    }
}

function mapStateToProps(state, ownProps){
    console.log("mapStateToProps: SignUp");
     return {}
}

export default connect(mapStateToProps)(SignUp)