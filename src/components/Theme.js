import React, {Component, Fragment} from 'react'
import {connect} from "react-redux";
import * as Sizes from "react-foundation";
import {Switch} from "react-foundation";
import {Cell} from "react-foundation";
import {Grid} from "react-foundation";
import {Button} from "react-foundation";
import {Colors} from "react-foundation";
import {Redirect} from "react-router-dom";
import {updateTheme} from "../actions/themeActions";

class Theme extends Component{
    constructor(props){
        super(props)
        this.themeDescriptionUpdate = this.themeDescriptionUpdate.bind(this)
        this.switchPrivateValue = this.switchPrivateValue.bind(this)
        this.addMedia = this.addMedia.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        // this.setState({title:this.props.theme.title,description:this.props.theme.description})
        this.state = {title:this.props.theme.title,description:this.props.theme.description}
    }

    componentDidMount(){
        console.log("Theme mounted");
    }

    handleDescriptionChange(event){
        event.preventDefault()
        this.setState({description:event.target.value})
    }
    handleTitleChange(event){
        event.preventDefault()
        this.setState({title:event.target.value})
    }

    themeDescriptionUpdate(event){
        event.preventDefault()
        const {theme,auth} = this.props
        const title = document.querySelector('[name="title"]').value
        const description = document.querySelector('[name="description"]').value

        const payload = JSON.stringify(this.state)
        console.log("payload",payload);
        this.props.dispatch(updateTheme(payload,theme.id,auth.token))
        this.setState({title:"",description:""})
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
        console.log("this state",this.state);
        return (
            <Fragment>
                <h1>Theme</h1>

                <form method={"post"} onSubmit={this.themeDescriptionUpdate}>
                    <Grid>
                        <Cell small={12} medium={6}>
                            <label>Title
                                <input type={"text"} name={"title"} value={this.state.title} onChange={this.handleTitleChange} />
                            </label>
                        </Cell>

                        <Cell small={12}>
                            <label>Description
                                <textarea name={"description"} value={this.state.description} onChange={this.handleDescriptionChange} />
                            </label>
                        </Cell>

                        <Cell small={6} medium={6}>
                            <p>Private</p>
                            <Switch input={{defaultChecked:false, name:'private'}} id={"privateSwitch"} size={Sizes.SMALL} active={{ text: 'Yes' }} inactive={{ text: 'No' }}/>
                        </Cell>


                        <Cell small={12}>
                            <Button color={Colors.PRIMARY} type={"submit"} >Update theme</Button>
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
    const theme_id = ownProps.match.params.id
    console.log("theme map state",state);
    return {
        auth: state.app.auth,
        theme: state.app.themes[theme_id]
    }
}

export default connect(mapStateToProps)(Theme)