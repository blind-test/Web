import React, {Component, Fragment} from 'react'
import {Topbar} from "./Topbar";
import {connect} from "react-redux";
import {sign_in} from "../actions/userActions";
import {BreadcrumbItem, Breadcrumbs, Button, Cell, Colors, Grid} from "react-foundation";
import {PrettyColorShape, PrettyColorType, Radio} from "../helper/prettyCheckbox";
import {FileUploader} from "../helper/FileUploader";
import Questions from "./Questions";
import {Link, Redirect} from "react-router-dom";
import {read_questions} from "../actions/questionAction";

class Media extends Component {
    constructor(props) {
        super(props)
        this.updateTitle = this.updateTitle.bind(this)
        if(this.props.redirect_to===undefined){
            this.state = {title: this.props.media.title || "",questions:[]}
        }
    }

    componentDidMount() {
        if(this.props.redirect_to===undefined)
            this.props.dispatch(read_questions(this.props.media.id,this.props.auth.token))

    }

    updateTitle(event) {
        event.preventDefault()
        this.setState({title: event.target.value})
    }

    renderOn() {
        console.log("Media props", this.props)
        return (
            <Fragment>
                <Breadcrumbs>
                    <BreadcrumbItem><Link to={"/"}>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to={"/themes"}>Themes</Link></BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to={`/theme/${this.props.theme.id}`}>{this.props.theme.title}</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem isDisabled>Medias</BreadcrumbItem>
                    <BreadcrumbItem>{this.props.media.title}</BreadcrumbItem>
                </Breadcrumbs>
                <Cell className={"media-info"} small={12}>
                    <Grid>
                        <Cell small={12}>
                            <label>Title
                                <input type={"text"} name={"title"} onChange={this.updateTitle}
                                       value={this.state.title}/>
                            </label>
                        </Cell>
                        {/*<Cell small={12}>*/}
                        {/*<img src={this.props.media.file_url}/>*/}
                        {/*</Cell>*/}
                        <Cell small={12}>
                            <Button color={Colors.PRIMARY} type={"submit"} onClick={this.create_media}>Update
                                media</Button>
                        </Cell>
                    </Grid>
                    <hr/>
                    {
                        this.props.questions.map((question, i) =>
                            <Fragment key={i}>
                                <Questions {...this.props} question={this.props.questions[i]}/>
                            </Fragment>
                        )
                    }
                    <hr/>
                    <h3>Add question</h3>
                    <Questions {...this.props} isNew={true}/>
                </Cell>
            </Fragment>
        )
    }

    render(){
        return this.props.redirect_to
            ? <Redirect to={this.props.redirect_to}/>
            : this.renderOn()
    }

}

function mapStateToProps(state, ownProps) {
    var props = {
        auth: state.app.auth,
        theme: state.app.themes[ownProps.match.params.themeId],
        media: state.app.medias[ownProps.match.params.mediaId]
    }
    props.questions = Object.values(state.app.questions).filter(question => question.media_id === props.media.id)

    if(!state.app.auth.token)
        return {redirect_to: "/sign_in"}
    if (!props.theme || !props.media)
        return {redirect_to: "/themes"}
    else
        return props
}

export default connect(mapStateToProps)(Media)