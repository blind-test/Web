import React, {Component, Fragment} from 'react'
import {Topbar} from "./Topbar";
import {connect} from "react-redux";
import {sign_in} from "../actions/userActions";
import {Link, Redirect} from "react-router-dom";
import {BreadcrumbItem, Breadcrumbs, Button, Cell, Colors, Grid, Inline} from "react-foundation";
import {delete_theme, read_themes} from "../actions/themeActions";
import {delete_media} from "../actions/mediaAction";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'

class ThemesListing extends Component{
    constructor(props){
        super(props)
        this.createTheme = this.createTheme.bind(this)
        this.deleteTheme = this.deleteTheme.bind(this)
    }

    componentDidMount(){
        this.props.dispatch(read_themes(this.props.auth.token))
    }

    createTheme(event){
        event.preventDefault()
    }


    deleteTheme(event){
        event.preventDefault()
        const themeId = event.target.getAttribute("theme")
        console.log("delete",themeId);
        this.props.dispatch(delete_theme("",themeId, this.props.auth.token))

    }


    renderOnline(){
        return (
            <Fragment>
                <Breadcrumbs>
                    <BreadcrumbItem><Link to={"/"}>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem>Themes</BreadcrumbItem>
                </Breadcrumbs>
                <Grid gutters={"padding"}>
                    {
                        Object.values(this.props.themes).map(theme => {
                            return (
                                <Cell small={12} medium={6} large={3} key={theme.id} style={{marginBottom: "1rem"}}>
                                    <div className="card mycard">
                                        <Link to={`/theme/${theme.id}`}>
                                            <div className="card-divider">
                                                {theme.title}
                                                <Button className={"bt-card-delete"} color={Colors.ALERT} onClick={this.deleteTheme} theme={theme.id}><FontAwesomeIcon icon={faTrash} /></Button>
                                            </div>
                                            <div className="card-section">
                                                <p>{theme.description}</p>
                                            </div>
                                        </Link>
                                    </div>
                                </Cell>
                            )
                        })
                    }
                    <Cell small={6} medium={4} large={3} style={{marginBottom: "1rem"}}>
                        <div className="card mycard">
                            <Link className={"card-add"} to={`/theme/new`}>
                                <FontAwesomeIcon icon={faPlus} style={{alignSelf:"center"}} />
                            </Link>
                        </div>
                    </Cell>
                </Grid>
            </Fragment>
        )
    }

    render(){
        const {auth} = this.props
        return !!auth.token
            ? this.renderOnline()
            : <Redirect to={"/sign_in"} />
    }
}

function mapStateToProps(state, ownProps){

     return {
         auth: state.app.auth,
         themes: state.app.themes
     }
}

export default connect(mapStateToProps)(ThemesListing)