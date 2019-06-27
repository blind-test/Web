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
import {Redirect} from "react-router-dom";

class Theme extends Component{
    constructor(props){
        super(props)
        this.themeDescriptionUpdate = this.themeDescriptionUpdate.bind(this)
        this.switchPrivateValue = this.switchPrivateValue.bind(this)
        this.addMedia = this.addMedia.bind(this)
    }

    componentDidMount(){
        console.log("Themes mounted");
    }


    themeDescriptionUpdate(event){
        event.preventDefault()
        // const payload = {email:username, password:password}
        // this.props.dispatch(sign_in(JSON.stringify(payload)))
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
                <h1>Theme</h1>

                <form method={"post"} onSubmit={this.themeDescriptionUpdate}>
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

     return {
         auth: state.app.auth,
     }
}

export default connect(mapStateToProps)(Theme)