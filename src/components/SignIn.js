import React, {Component, Fragment} from 'react'
import {Topbar} from "./Topbar";
import {connect} from "react-redux";

class SignIn extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log("SignIn mounted");
    }

    render(){
        return (
            <Fragment>
                <form method={"post"}>
                    <input type={"text"} name={"username"} /><br/>
                    <input type="password" name={"password"}/>
                    <button type={"submit"}>Sign In</button>
                </form>
                <p>Sign me In!</p>
            </Fragment>
        )
    }
}

function mapStateToProps(state, ownProps){
     return {}
}

export default connect(mapStateToProps)(SignIn)