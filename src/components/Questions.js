import React, {Component, Fragment} from 'react'
import {Topbar} from "./Topbar";
import {connect} from "react-redux";
import {sign_in} from "../actions/userActions";
import {Link, Redirect} from "react-router-dom";
import {Button, Cell, Colors, Grid} from "react-foundation";
import {read_themes} from "../actions/themeActions";
import {read_medias} from "../actions/mediaAction";
import {CheckBox, PrettyColorShape, PrettyColorType} from "../helper/prettyCheckbox";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faSave } from '@fortawesome/free-solid-svg-icons'

import {
    create_question,
    delete_question,
    read_question,
    read_questions,
    update_question
} from "../actions/questionAction";

class Questions extends Component{
    constructor(props){
        super(props)
        this.submitQuestion = this.submitQuestion.bind(this)
        this.addAnswer = this.addAnswer.bind(this)
        this.changeAnswerContent = this.changeAnswerContent.bind(this)
        this.changeQuestionContent = this.changeQuestionContent.bind(this)
        this.deleteAnswer = this.deleteAnswer.bind(this)
        this.deleteQuestion = this.deleteQuestion.bind(this)
        this.state = {answers: ["A","B"], question:""}
        if(!this.props.isNew){
            this.state.question = this.props.question.content
            this.state.answers = JSON.parse(this.props.question.answers)
        }

    }

    componentDidMount(){
    }

    changeQuestionContent(event){
        this.setState({question:event.target.value})
    }

    submitQuestion(event){
        event.preventDefault()

        var payload = {content: this.state.question, answers: JSON.stringify(this.state.answers), media_id:this.props.media.id}
        if(this.props.isNew) {
            this.props.dispatch(create_question(payload, this.props.media.id, this.props.auth.token))
            this.setState({answers: ["A","B"], question:""})
        }
        else
            this.props.dispatch(update_question(payload,this.props.question.id,this.props.media.id,this.props.auth.token))
    }


    changeAnswerContent(event){
        const index = parseInt(event.target.getAttribute("answer"),10)
        const answers = [...this.state.answers]
        answers[index] = event.target.value
        this.setState({answers: answers})

    }

    addAnswer(event){
        event.preventDefault()
        const answers = this.state.answers
        answers.push("")
        this.setState({answers: answers})
    }

    deleteQuestion(event) {
        event.preventDefault()
        this.props.dispatch(delete_question(this.props.media.id,this.props.question.id,this.props.auth.token))
    }

    deleteAnswer(event){
        event.preventDefault()
        const index = parseInt(event.target.getAttribute("answer"),10)
        this.setState({answers:this.state.answers.filter((e,i) => i!==index)})
    }

    renderOnline(){
        return (
            <Fragment>
                <form onSubmit={this.submitQuestion}>
                    <Grid gutters={"padding"}>
                        <Cell small={12}>
                            <Grid>
                                <Cell className={"input-field auto"} >
                                    <textarea name={"question"} value={this.state.question} onChange={this.changeQuestionContent} />
                                </Cell>
                                <Cell className={"shrink"} style={{paddingTop:"45px"}}>

                                    <Button color={Colors.PRIMARY} onClick={this.addAnswer} ><FontAwesomeIcon icon={faPlus}/></Button>
                                    { !this.props.isNew ? <Button color={Colors.ALERT} onClick={this.deleteQuestion} ><FontAwesomeIcon icon={faTrash}/></Button> : undefined}
                                    <Button color={Colors.SUCCESS} onClick={this.submitQuestion} ><FontAwesomeIcon icon={faSave}/></Button>

                                </Cell>
                            </Grid>
                        </Cell>
                        {
                            this.state.answers.map( (answer,i) =>
                                <Cell small={6} medium={4} key={i}>
                                    <Grid>
                                        <Cell className={"auto input-field"} >
                                            <input answer={i} type={"text"} value={answer} onChange={this.changeAnswerContent} />
                                        </Cell>
                                        <Cell className={"shrink"} style={{alignSelf:"flex-end"}}>
                                            <Button color={Colors.ALERT} answer={i} onClick={this.deleteAnswer}><FontAwesomeIcon icon={faTrash} style={{color:"white"}}/></Button>
                                        </Cell>
                                    </Grid>
                                </Cell>
                            )
                        }
                    </Grid>
                </form>
            </Fragment>
        )
    }

    render(){
        return this.renderOnline()
    }
}

function mapStateToProps(state, ownProps){
    return ownProps
}

export default connect(mapStateToProps)(Questions)