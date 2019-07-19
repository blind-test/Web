import React, {Component, Fragment} from 'react'
import {Topbar} from "./Topbar";
import {connect} from "react-redux";
import {sign_in} from "../actions/userActions";
import {BreadcrumbItem, Breadcrumbs, Button, Cell, Colors, Grid} from "react-foundation";
import {PrettyColorShape, PrettyColorType, Radio} from "../helper/prettyCheckbox";
import {FileUploader} from "../helper/FileUploader";
import {create_media} from "../actions/mediaAction";
import {Link, Redirect} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

class CreateMedia extends Component{
    constructor(props){
        super(props)
        this.createMedia = this.createMedia.bind(this)
        this.updateKind = this.updateKind.bind(this)
        this.updateTitle= this.updateTitle.bind(this)

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
        this.props.dispatch(create_media(form,theme.id, auth.token))

    }

    updateKind(event){
        this.setState({kind:event.target.getAttribute("kind")})
    }

    updateTitle(event){
        event.preventDefault()
        this.setState({title:event.target.value})
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
                <Cell small={12}>
                    <Grid>
                        <Cell small={12}>
                            <label>Title
                                <input type={"text"} name={"title"} onChange={this.updateTitle}/>
                            </label>
                        </Cell>
                        <Cell small={12}>
                            Type
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