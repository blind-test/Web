import React, {Component, Fragment} from 'react'
import {Topbar} from "./Topbar";
import {connect} from "react-redux";
import {sign_in} from "../actions/userActions";
import {Button, Cell, Colors, Grid} from "react-foundation";
import {PrettyColorShape, PrettyColorType, Radio} from "../helper/prettyCheckbox";
import {FileUploader} from "../helper/FileUploader";

class Media extends Component{
    constructor(props){
        super(props)
        console.table(props);
        this.updateTitle = this.updateTitle.bind(this)
        this.state = {title:this.props.media.title||""}
    }

    componentDidMount(){
        console.log("Media mounted");
    }

    updateTitle(event){
        event.preventDefault()
        this.setState({title:event.target.value})
        console.log(this.state);
    }

    render(){
        const {auth} = this.props
        return (

            <Cell className={"media-info"} small={12} >
                <Grid>
                    <Cell small={12} >
                        <label>Title
                            <input type={"text"} name={"title"} onChange={this.updateTitle} value={this.state.title} />
                        </label>
                    </Cell>
                    <Cell small={12}>
                        <img src={this.props.media.file_url} />
                    </Cell>
                    <Cell small={12}>
                        <Button color={Colors.PRIMARY} type={"submit"} onClick={this.createMedia}>Update media</Button>
                    </Cell>
                </Grid>
            </Cell>
        )

    }
}

function mapStateToProps(state, ownProps){

     return {
         auth: state.app.auth,
         theme: state.app.themes[ownProps.match.params.themeId],
         media: state.app.medias[ownProps.match.params.mediaId]

     }
}

export default connect(mapStateToProps)(Media)