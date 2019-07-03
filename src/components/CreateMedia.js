import React, {Component, Fragment} from 'react'
import {Topbar} from "./Topbar";
import {connect} from "react-redux";
import {sign_in} from "../actions/userActions";
import {Button, Cell, Colors, Grid} from "react-foundation";
import {PrettyColorShape, PrettyColorType, Radio} from "../helper/prettyCheckbox";
import {FileUploader} from "../helper/FileUploader";
import {createMedia} from "../actions/mediaAction";

class CreateMedia extends Component{
    constructor(props){
        super(props)
        console.table(props);
        this.createMedia = this.createMedia.bind(this)
        this.updateKind = this.updateKind.bind(this)
        this.updateTitle= this.updateTitle.bind(this)

        this.state = {title:"",kind:""}
    }

    componentDidMount(){
        console.log("CreateMedia creation mounted");
    }


    createMedia(event){
        const {theme, auth} = this.props
        event.preventDefault()
        var form = new FormData()
        form.append("title",this.state.title)
        form.append("kind",this.state.kind)
        var file = document.getElementById('mediaFile').files[0]
        form.append("file",file)
        for(var pair of form.entries())
            console.log(pair[0],": ",pair[1]);
        this.props.dispatch(createMedia(form,theme.id, auth.token))

    }

    updateKind(event){
        this.setState({kind:event.target.getAttribute("kind")})
        console.log(this.state);
    }
    updateTitle(event){
        event.preventDefault()
        this.setState({title:event.target.value})
        console.log(this.state);
    }


    render(){
        const {auth} = this.props
        return (

            <Cell small={12} >
                <Grid>
                    <Cell small={12} >
                        <label>Title
                            <input type={"text"} name={"title"} onChange={this.updateTitle} />
                        </label>
                    </Cell>
                    <Cell small={12}>
                        Type
                    </Cell>

                    <Cell small={1}>
                        <Radio type={PrettyColorType.PRIMARY} shape={PrettyColorShape.ROUND} kind={"movie"} name={"type_media"} label={"Movie"} onChange={this.updateKind}  />
                    </Cell>
                    <Cell small={1}>
                        <Radio type={PrettyColorType.PRIMARY} shape={PrettyColorShape.ROUND} kind={"picture"} name={"type_media"} label={"Image"} onChange={this.updateKind}  />
                    </Cell>
                    <Cell small={1}>
                        <Radio type={PrettyColorType.PRIMARY} shape={PrettyColorShape.ROUND} kind={"music"} name={"type_media"} label={"Music"} onChange={this.updateKind} />
                    </Cell>
                    <Cell small={12} >
                        <FileUploader id={"mediaFile"} label={"Upload media"}/>
                    </Cell>
                    <Cell small={12}>
                        <Button color={Colors.PRIMARY} type={"submit"} onClick={this.createMedia}>Create media</Button>
                    </Cell>
                </Grid>
            </Cell>
        )

    }
}

function mapStateToProps(state, ownProps){

     return {
        auth: state.app.auth,
        theme: state.app.themes[ownProps.match.params.id]
     }
}

export default connect(mapStateToProps)(CreateMedia)