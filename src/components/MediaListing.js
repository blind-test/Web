import React, {Component, Fragment} from 'react'
import {Topbar} from "./Topbar";
import {connect} from "react-redux";
import {sign_in} from "../actions/userActions";
import {Link, Redirect} from "react-router-dom";
import {Button, Cell, Colors} from "react-foundation";
import {read_themes} from "../actions/themeActions";
import {read_medias} from "../actions/mediaAction";

class MediaListing extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.dispatch(read_medias(this.props.theme.id, this.props.auth.token))
    }


    renderOnline(){
        console.log("MEdia list",this.props);
        return (
            <Fragment>

                <h1>Medias</h1>
                <ul>
                    {
                        Object.values(this.props.medias).map(media => {
                            return (<li key={media.id}><Link to={`/theme/${media.theme_id}/media/${media.id}`}>{media.title}</Link></li>)
                        })
                    }
                </ul>
            </Fragment>
        )
    }

    render(){
        return this.renderOnline()
    }
}

function mapStateToProps(state, ownProps){
    console.log(ownProps);
    console.log("mlist state:",state);
    const theme = state.app.themes[ownProps.theme]
    const medias = Object.values(state.app.medias).filter(media => media.theme_id === theme.id)
    return {
        auth: state.app.auth,
        theme: theme,
        medias: medias || {}
    }
}

export default connect(mapStateToProps)(MediaListing)