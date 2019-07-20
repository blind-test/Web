import React, {Component, Fragment} from 'react'
import {Topbar} from "./Topbar";
import {connect} from "react-redux";
import {sign_in} from "../actions/userActions";
import Media from "./Media";
import * as Sizes from "react-foundation";
import {Switch} from "react-foundation";
import {Cell} from "react-foundation";
import {Grid} from "react-foundation";
import {Button} from "react-foundation";
import {Colors} from "react-foundation";
import {Link, Redirect} from "react-router-dom";
import {create_theme} from "../actions/themeActions";
import {Breadcrumbs} from "react-foundation";
import {BreadcrumbItem} from "react-foundation";
import {faExclamationTriangle, faSave} from "@fortawesome/free-solid-svg-icons/index";
import {Callout} from "react-foundation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";

class CreateTheme extends Component{
    constructor(props){
        super(props)
        this.switchPrivateValue = this.switchPrivateValue.bind(this)
        this.createTheme = this.createTheme.bind(this)
        this.creationFailed = this.creationFailed.bind(this)
        this.redirectAfterCreation = this.redirectAfterCreation.bind(this)
        this.state = {}
    }

    componentDidMount(){
    }

    switchPrivateValue(event){
        event.preventDefault()
        const privateForm = document.getElementById("privateSwitch").previousSibling;
        privateForm.checked = !privateForm.checked
    }

    createTheme(event){
        event.preventDefault()
        const {dispatch, auth} = this.props

        const title = document.querySelector('[name="title"]')
        const description = document.querySelector('[name="description"]')
        const callback = message => message ? this.creationFailed(message) : this.redirectAfterCreation()
        const payload = {title: title.value, description:description.value}
        dispatch(create_theme(payload,auth.token, callback))
    }


    creationFailed(message){
        this.setState({message: message})
    }

    redirectAfterCreation(){
        this.props.history.push("/themes")
    }


    renderOnline(){
        return (
            <Fragment>
                <Breadcrumbs>
                    <BreadcrumbItem><Link to={"/"}>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to={"/themes"}>Themes</Link></BreadcrumbItem>
                    <BreadcrumbItem isDisabled={true}>New theme</BreadcrumbItem>
                </Breadcrumbs>

                { this.state.message ?
                    <Callout color={Colors.ALERT}>
                        <h5 style={{color:"darkred"}}><FontAwesomeIcon icon={faExclamationTriangle}/>Creation Failure</h5>
                        <p>{this.state.message}</p>
                    </Callout>
                    : ""
                }

                <form method={"post"} onSubmit={this.themeUpdate}>
                    <Grid>
                        <Cell small={12} medium={6}>
                            <label>Title
                                <input type={"text"} name={"title"} />
                            </label>
                        </Cell>

                        <Cell small={12}>
                            <label>Description
                                <textarea name={"description"} />
                            </label>
                        </Cell>

                        <Cell small={6} medium={6}>
                            <p>Private</p>
                            <Switch input={{defaultChecked:false, name:'private'}} id={"privateSwitch"} size={Sizes.SMALL} active={{ text: 'Yes' }} inactive={{ text: 'No' }}/>
                        </Cell>


                        <Cell small={12}>
                            <Button color={Colors.SUCCESS} type={"submit"} onClick={this.createTheme} ><FontAwesomeIcon icon={faSave}/></Button>
                        </Cell>
                    </Grid>
                </form>


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
     }
}

export default connect(mapStateToProps)(CreateTheme)