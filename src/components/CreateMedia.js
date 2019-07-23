import React, {Component, Fragment} from 'react'
import {Topbar} from "./Topbar";
import {connect} from "react-redux";
import {sign_in} from "../actions/userActions";
import {BreadcrumbItem, Breadcrumbs, Button, Callout, Cell, Colors, Grid} from "react-foundation";
import {PrettyColorShape, PrettyColorType, Radio} from "../helper/prettyCheckbox";
import {FileUploader} from "../helper/FileUploader";
import {create_media} from "../actions/mediaAction";
import {Link, Redirect} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons/index";

class CreateMedia extends Component{
    constructor(props){
        super(props)
        this.createMedia = this.createMedia.bind(this)
        this.updateKind = this.updateKind.bind(this)
        this.updateTitle= this.updateTitle.bind(this)
        this.creationFailed = this.creationFailed.bind(this)
        this.redirectAfterCreation = this.redirectAfterCreation.bind(this)
        this.state = {title:"",kind:""}
    }

    componentDidMount(){
    }


    createMedia(event){
        const {theme, auth} = this.props
        event.preventDefault()
        var form = new FormData()
        form.append("title",this.state.title)
        // form.append("kind",this.state.kind)
        var file = document.getElementById('mediaFile').files[0]
        form.append("file",file)
        const callback = message => message ? this.creationFailed(message) : this.redirectAfterCreation()
        this.props.dispatch(create_media(form,theme.id, auth.token, callback))

    }

    updateKind(event){
        this.setState({kind:event.target.getAttribute("kind")})
    }

    updateTitle(event){
        event.preventDefault()
        this.setState({title:event.target.value})
    }


    creationFailed(message){
        this.setState({message: message})
    }

    redirectAfterCreation(){
        this.props.history.push(`/theme/${this.props.theme.id}`)
    }

    renderOnline() {
        return (
            <Fragment>

                <Breadcrumbs>
                    <BreadcrumbItem><Link to={"/"}>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to={"/themes"}>Themes</Link></BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to={`/theme/${this.props.theme.id}`}>{this.props.theme.title}</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem isDisabled>Create Media</BreadcrumbItem>
                </Breadcrumbs>

                { this.state.message ?
                    <Callout color={Colors.ALERT}>
                        <h5 style={{color:"darkred"}}><FontAwesomeIcon icon={faExclamationTriangle}/>Creation Failure</h5>
                        <p>{this.state.message}</p>
                    </Callout>
                    : ""
                }

                <Cell small={12}>
                    <Grid>
                        <Cell className={"input-field"} small={12}>
                                <input type={"text"} name={"title"} onChange={this.updateTitle}/>
                            <label>Title</label>

                        </Cell>

                        <Cell small={12}>
                            <FileUploader id={"mediaFile"} label={"Upload media"}/>
                        </Cell>
                        <Cell small={12}>
                            <Button color={Colors.PRIMARY} type={"submit"} onClick={this.createMedia}><FontAwesomeIcon icon={faSave}/></Button>
                        </Cell>
                    </Grid>
                </Cell>
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

     const props = {
        auth: state.app.auth,
        theme: state.app.themes[ownProps.match.params.id]
     }
    if(!state.app.auth.token)
        return {redirect_to: "/sign_in"}
    if(!props.theme) ownProps.history.push("/themes")
    else
        return props
}

export default connect(mapStateToProps)(CreateMedia)