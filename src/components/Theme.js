import React, {Component, Fragment} from 'react'
import {connect} from "react-redux";
import * as Sizes from "react-foundation";
import {Switch} from "react-foundation";
import {Cell} from "react-foundation";
import {Grid} from "react-foundation";
import {Button} from "react-foundation";
import {Colors} from "react-foundation";
import {Link, Redirect} from "react-router-dom";
import {update_theme} from "../actions/themeActions";
import MediaListing from "./MediaListing";
import {read_medias} from "../actions/mediaAction";
import {Breadcrumbs} from "react-foundation";
import {BreadcrumbItem} from "react-foundation";
import {faSave} from "@fortawesome/free-solid-svg-icons/index";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";

class Theme extends Component{
    constructor(props){
        super(props)
        this.themeUpdate = this.themeUpdate.bind(this)
        this.switchPrivateValue = this.switchPrivateValue.bind(this)
        this.addMedia = this.addMedia.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        // this.setState({title:this.props.theme.title,description:this.props.theme.description})
        this.state = {title:this.props.theme.title,description:this.props.theme.description}
    }

    componentDidMount(){
    }

    handleDescriptionChange(event){
        event.preventDefault()
        this.setState({description:event.target.value})
    }
    handleTitleChange(event){
        event.preventDefault()
        this.setState({title:event.target.value})
    }

    themeUpdate(event){
        event.preventDefault()
        const {theme,auth} = this.props

        const payload = JSON.stringify(this.state)
        this.props.dispatch(update_theme(payload,theme.id,auth.token))
    }

    switchPrivateValue(event){
        event.preventDefault()
        const privateForm = document.getElementById("privateSwitch").previousSibling;
        privateForm.checked = !privateForm.checked
    }

    addMedia(event){
        event.preventDefault()
    }

    renderOnline(){
        return (
            <Fragment>
                <Breadcrumbs>
                    <BreadcrumbItem><Link to={"/"}>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to={"/themes"}>Themes</Link></BreadcrumbItem>
                    <BreadcrumbItem>{this.props.theme.title}</BreadcrumbItem>
                </Breadcrumbs>
                <form method={"post"} onSubmit={this.themeUpdate}>
                    <Grid gutters={"padding"}>
                        <Cell small={6} medium={6}>
                            <label>Title
                                <input type={"text"} name={"title"} value={this.state.title} onChange={this.handleTitleChange} />
                            </label>
                        </Cell>

                        <Cell small={6}>
                            <Button color={Colors.PRIMARY} type={"submit"} onClick={this.themeUpdate}><FontAwesomeIcon icon={faSave} /></Button>
                        </Cell>

                        <Cell small={12}>
                            <label>Description
                                <textarea name={"description"} value={this.state.description} onChange={this.handleDescriptionChange} />
                            </label>
                        </Cell>

                        <Cell small={6} medium={6} hidden>
                            <p>Private</p>
                            <Switch input={{defaultChecked:false, name:'private'}} id={"privateSwitch"} size={Sizes.SMALL} active={{ text: 'Yes' }} inactive={{ text: 'No' }}/>
                        </Cell>

                    </Grid>
                </form>

                <MediaListing theme={this.props.theme.id} dispatch={this.props.dispatch} />

            </Fragment>
        )
    }

    render(){
        const {redirect_to} = this.props
        return !redirect_to
            ? this.renderOnline()
            : <Redirect to={this.props.redirect_to} />
    }
}

function mapStateToProps(state, ownProps){
    const theme_id = ownProps.match.params.id
    const props = {
        auth: state.app.auth,
        theme: state.app.themes[theme_id]
    }
    if(!state.app.auth.token)
        return {redirect_to: "/sign_in"}
    if(!props.theme) ownProps.history.push("/themes")
    else
        return props
}

export default connect(mapStateToProps)(Theme)