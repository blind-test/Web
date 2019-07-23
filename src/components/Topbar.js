import React, {Component, Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import {sign_out} from "../actions/userActions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faUsers, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'


class Topbar extends Component{
    constructor(props){
        super(props)
        this.logOut = this.logOut.bind(this)

        // signale.success('Topbar')
        // console.table(props);
    }

    logOut(event){
        event.preventDefault()
        this.props.dispatch(sign_out(this.props.auth.token));
    }


    render(){
        const {auth} = this.props
        return (
            <div className="top-bar">
                <div className="top-bar-left">
                    <ul className="dropdown menu" >
                        <li className="menu-text">Blind Test</li>
                        {!!auth.token
                            ? <Fragment>
                                <li><Link to={"/profile"}>Profile</Link></li>
                                <li><Link to={"/themes"}>Themes</Link></li>
                            </Fragment>
                            : ""
                        }
                    </ul>
                </div>
                <div className="top-bar-right">
                    <ul className="menu">
                        {!auth.token
                            ?
                            <Fragment>
                                <li><Link to={"/sign_in"}><FontAwesomeIcon icon={faSignInAlt}/> Sign In</Link></li>
                                <li><Link to={"/sign_up"}><FontAwesomeIcon icon={faUsers}/> Join Us</Link></li>
                            </Fragment>
                            :
                            <Fragment>
                                <li><a onClick={this.logOut}><FontAwesomeIcon icon={faSignOutAlt}/> Log out</a></li>
                            </Fragment>
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state,ownProps) {
    return {
        auth: state.app.auth,

    };
}
export default connect(mapStateToProps)(Topbar)