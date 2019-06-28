import React, {Component, Fragment} from 'react'
import {Topbar} from "./Topbar";
import {connect} from "react-redux";
import {sign_in} from "../actions/userActions";
import {Link, Redirect} from "react-router-dom";
import {Button, Cell, Colors} from "react-foundation";
import {read_themes} from "../actions/themeActions";

class ThemesListing extends Component{
    constructor(props){
        super(props)
        this.createTheme = this.createTheme.bind(this)
    }

    componentDidMount(){
        console.log("Themes List mounted");
        this.props.dispatch(read_themes(this.props.auth.token))
    }

    createTheme(event){
        event.preventDefault()
    }


    renderOnline(){
        return (
            <Fragment>

                <h1>Themes</h1>
                <ul>
                    {
                        Object.values(this.props.themes).map(theme => {
                            return (<li key={theme.id}><Link to={`/theme/${theme.id}`}>{theme.title}</Link></li>)
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