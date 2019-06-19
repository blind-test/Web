import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'

import {connect} from "react-redux";
import {sign_out} from "../actions/userActions";

class Topbar extends Component{
    constructor(props){
        super(props)
        this.logOut = this.logOut.bind(this)
        console.table(props);
    }

    logOut(event){
        event.preventDefault()
        const payload = this.props.auth.token | ""
        this.props.dispatch(sign_out(JSON.stringify(payload)))
    }


    render(){
        const {auth} = this.props
        return (
            <div className={"topbar"}>
                <Link to={"/"}>Home</Link>&nbsp;/&nbsp;
                {auth.token === "" || !auth.token
                    ?
                    <Fragment>
                        <Link to={"/sign_in"}>Sign In</Link>&nbsp;/&nbsp;
                        <Link to={"/sign_up"}>Join Us</Link>
                    </Fragment>
                    : <a onClick={this.logOut}>Log out</a>
                }


            </div>
        )
    }
}

function mapStateToProps(state,ownProps) {
    console.log(state);
    return {
        auth: state.app.auth,

    };
}
export default connect(mapStateToProps)(Topbar)