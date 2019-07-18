import React, {Component, Fragment} from 'react'
import {Topbar} from "./Topbar";
import {connect} from "react-redux";
import {sign_in} from "../actions/userActions";
import {Link, Redirect} from "react-router-dom";
import {Button, Cell, Colors, Grid} from "react-foundation";
import {read_themes} from "../actions/themeActions";
import {delete_media, read_medias} from "../actions/mediaAction";
import {faTrash, faImage, faMusic, faFilm} from "@fortawesome/free-solid-svg-icons/index";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";

class MediaListing extends Component{

    constructor(props){
        super(props)
        this.deleteMedia = this.deleteMedia.bind(this)
    }

    componentDidMount(){
        this.props.dispatch(read_medias(this.props.theme.id, this.props.auth.token))
    }

    deleteMedia(event){
        event.preventDefault()
        const mediaId = event.target.getAttribute("media")
        console.log("delete",event.target.getAttribute("media"));
        this.props.dispatch(delete_media(this.props.theme.id, mediaId, this.props.auth.token))
    }

    renderOnline(){
        console.log("Media list",this.props);
        return (
            <Fragment>

                <h1>Medias</h1>
                <Grid gutters={"padding"}>
                    {
                        Object.values(this.props.medias).map(media => {
                            return (
                                <Cell small={6} medium={4} large={3} key={media.id}>
                                    <div className="card mycard">
                                        <Link to={`/theme/${media.theme_id}/media/${media.id}`}>
                                            <div className="card-divider">
                                                {media.title}
                                                <Button className={"bt-card-delete"} color={Colors.ALERT} onClick={this.deleteMedia} media={media.id}><FontAwesomeIcon icon={faTrash} /></Button>
                                            </div>
                                            <div className="card-section txtCenter" style={{fontSize: "3rem"}}>
                                                {
                                                    media.kind === 'picture'
                                                    ? <FontAwesomeIcon icon={faImage} />
                                                    : media.kind === 'music'
                                                    ? <FontAwesomeIcon icon={faMusic} />
                                                    : media.kind === 'movie' || media.kind === 'video'
                                                    ? <FontAwesomeIcon icon={faFilm} />
                                                    : ''
                                                }
                                            </div>
                                        </Link>
                                    </div>
                                </Cell>

                            )
                        })
                    }
                </Grid>
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