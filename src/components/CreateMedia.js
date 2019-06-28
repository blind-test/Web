import React, {Component, Fragment} from 'react'
import {Topbar} from "./Topbar";
import {connect} from "react-redux";
import {sign_in} from "../actions/userActions";
import {Cell, Grid} from "react-foundation";
import {PrettyColorShape, PrettyColorType, Radio} from "../helper/prettyCheckbox";
import {FileUploader} from "../helper/FileUploader";

class Media extends Component{
    constructor(props){
        super(props)
        console.table(props);
        this.profileUpdate = this.profileUpdate.bind(this)
        this.uploadFile = this.uploadFile.bind(this)
    }

    componentDidMount(){
        console.log("Media mounted");
    }

    profileUpdate(event){
        event.preventDefault()
        // const payload = {email:username, password:password}
        // this.props.dispatch(sign_in(JSON.stringify(payload)))
    }

    uploadFile(event){
        event.preventDefault()
        console.log("tanbvneltk");
    }


    render(){
        const {auth} = this.props
        return (

            <Cell className={"media-info"} small={12} >
                <Grid>
                    <Cell small={12} >
                        <label>Title
                            <input type={"text"} name={"title"} />
                        </label>
                    </Cell>
                    <Cell small={12}>
                        Type
                    </Cell>

                    <Cell small={1}>
                        <Radio type={PrettyColorType.PRIMARY} shape={PrettyColorShape.ROUND} name={"type_media"} label={"Movie"}/>
                    </Cell>
                    <Cell small={1}>
                        <Radio type={PrettyColorType.PRIMARY} shape={PrettyColorShape.ROUND} name={"type_media"} label={"Image"}/>
                    </Cell>
                    <Cell small={1}>
                        <Radio type={PrettyColorType.PRIMARY} shape={PrettyColorShape.ROUND} name={"type_media"} label={"Music"}/>
                    </Cell>
                    <Cell small={12} >
                        <FileUploader id={"gh"} label={"Upload media"} click={this.uploadFile}/>
                    </Cell>
                </Grid>
            </Cell>
        )

    }
}

function mapStateToProps(state, ownProps){

     return {

     }
}

export default connect(mapStateToProps)(Media)