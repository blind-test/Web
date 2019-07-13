import React, {Component, Fragment} from 'react'
import {Topbar} from "./Topbar";
import {connect} from "react-redux";
import {sign_in} from "../actions/userActions";
import {Link, Redirect} from "react-router-dom";
import {BreadcrumbItem, Breadcrumbs, Button, Cell, Colors, Inline} from "react-foundation";
import {deleteTheme, read_themes} from "../actions/themeActions";
import {delete_media} from "../actions/mediaAction";

class ThemesListing extends Component{
    constructor(props){
        super(props)
        this.createTheme = this.createTheme.bind(this)
        this.deleteTheme = this.deleteTheme.bind(this)
    }

    componentDidMount(){
        console.log("Themes List mounted");
        this.props.dispatch(read_themes(this.props.auth.token))
    }

    createTheme(event){
        event.preventDefault()
    }


    deleteTheme(event){
        const themeId = event.target.getAttribute("theme")
        console.log("delete",themeId);
        this.props.dispatch(deleteTheme("",themeId, this.props.auth.token))
    }


    renderOnline(){
        return (
            <Fragment>
                <Breadcrumbs>
                    <BreadcrumbItem><Link to={"/"}>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem>Themes</BreadcrumbItem>
                </Breadcrumbs>
                <h1>Themes</h1>
                <ul>
                    {
                        Object.values(this.props.themes).map(theme => {
                            return (<li key={theme.id}>
                                <Link to={`/theme/${theme.id}`}><Button color={Colors.SUCCESS}> {theme.title}</Button></Link>
                                <Button color={Colors.ALERT} onClick={this.deleteTheme} theme={theme.id}>Delete</Button>
                            </li>)
                        })
                    }
                </ul>
                <Cell small={12}>
                    <Link className={"button primary"}  to={"/theme/new"} >Create theme</Link>
                </Cell>
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