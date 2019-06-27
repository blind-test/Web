import React, {Component, Fragment} from 'react'
import {Topbar} from "./Topbar";
import {connect} from "react-redux";
import {sign_in} from "../actions/userActions";

class Profile extends Component{
    constructor(props){
        super(props)
        this.profileUpdate = this.profileUpdate.bind(this)
    }

    componentDidMount(){
        console.log("Profile mounted");
    }

    profileUpdate(event){
        event.preventDefault()
        // const payload = {email:username, password:password}
        // this.props.dispatch(sign_in(JSON.stringify(payload)))
    }


    renderOnline(){
        return (
            <Fragment>
                <h1>Profile</h1>
                <form method={"post"} onSubmit={this.profileUpdate} >
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
                        <div className={"small-12 cell"}>
                            <label>Current Password
                                <input type="password" name={"password"}/>
                            </label>
                        </div>
                        <div className={"medium-6 small-12 cell"}>
                            <label>New Password
                                <input type="password" name={"new_password"}/>
                            </label>
                        </div>
                        <div className={"medium-6 small-12 cell"}>
                            <label>New Password Confirmation
                                <input type="password" name={"new_password_confirmation"}/>
                            </label>
                        </div>
                        <div className={"medium-12 small-12 cell"}>
                            <button className={"button"} type={"submit"} >Update profile</button>
                        </div>
                    </div>
                </form>
            </Fragment>
        )
    }

    render(){
        const {auth} = this.props
        return auth.token && auth.token!==""
            ? this.renderOnline()
            : ""
    }
}

function mapStateToProps(state, ownProps){

     return {
         auth: state.app.auth,
     }
}

export default connect(mapStateToProps)(Profile)