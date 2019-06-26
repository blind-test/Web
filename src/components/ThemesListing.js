import React, {Component, Fragment} from 'react'
import {Topbar} from "./Topbar";
import {connect} from "react-redux";
import {sign_in} from "../actions/userActions";

class ThemesListing extends Component{
    constructor(props){
        super(props)
        this.profileUpdate = this.profileUpdate.bind(this)
    }

    componentDidMount(){
        console.log("Themes List mounted");
    }

    profileUpdate(event){
        event.preventDefault()
        // const payload = {email:username, password:password}
        // this.props.dispatch(sign_in(JSON.stringify(payload)))
    }


    renderOnline(){
        return (
            <Fragment>
                <h1>Themes</h1>
                <ul>
                        {
                            [...Array(10).keys()].map(i => {
                                return (<li key={i}><a href={`/theme/${i}`}>Theme {i+1}</a></li>)
                            })
                        }
                </ul>
            </Fragment>
        )
    }

    render(){
        const {auth} = this.props
        return auth.token && auth.token!==""
            ? this.renderOnline()
            : "plpop"
    }
}

function mapStateToProps(state, ownProps){

     return {
         auth: state.app.auth,
     }
}

export default connect(mapStateToProps)(ThemesListing)