import React, {Component, Fragment} from 'react'
import {Topbar} from "./Topbar";
import {connect} from "react-redux";
import {sign_in} from "../actions/userActions";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSave, faTrash} from '@fortawesome/free-solid-svg-icons'
import {BreadcrumbItem, Breadcrumbs, Button, Cell, Colors, Grid} from "react-foundation";
import {Link} from "react-router-dom";

class Profile extends Component {
    constructor(props) {
        super(props)
        this.profileUpdate = this.profileUpdate.bind(this)
        this.deleteAccount = this.deleteAccount.bind(this)
        this.changePasswordConfirmation = this.changePasswordConfirmation.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.changeCurrentPassword = this.changeCurrentPassword.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.changeUsername = this.changeUsername.bind(this)
        this.state = {nickname: "", email: "", current_password: "", password: "", password_confirmation: ""}
    }

    componentDidMount() {
    }

    profileUpdate(event) {
        event.preventDefault()
        // const payload = {email:username, password:password}
        // this.props.dispatch(sign_in(JSON.stringify(payload)))

    }

    deleteAccount(event) {
        event.preventDefault()
        if (confirm("Are you sure you want to delete your account ?")) {
            console.log("to delete");
        }
    }

    changeUsername(event) {
        this.setState({nickname: event.target.value})
    }

    changeEmail(event) {
        this.setState({email: event.target.value})
    }

    changeCurrentPassword(event) {
        this.setState({current_password: event.target.value})
    }

    changePassword(event) {
        this.setState({password: event.target.value})
    }

    changePasswordConfirmation(event) {
        this.setState({password_confirmation: event.target.value})
    }


    renderOnline() {
        return (
            <Fragment>

                <Breadcrumbs>
                    <BreadcrumbItem><Link to={"/"}>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem isDisabled={true}>Profile</BreadcrumbItem>
                </Breadcrumbs>
                <form method={"post"} onSubmit={this.profileUpdate}>
                    <Grid gutters={"padding"}>
                        <Cell className={"input-field"} small={12} medium={6}>
                            <input type={"text"} name={"username"} onChange={this.changeUsername}
                                   value={this.state.nickname}/>
                            <label>Username</label>
                        </Cell>
                        <Cell className={"input-field"} small={12} medium={6}>
                            <input type={"text"} name={"email"} onChange={this.changeEmail} value={this.state.email}/>
                            <label>Email</label>

                        </Cell>
                        <Cell className={"input-field"} small={12}>
                            <input type="password" name={"password"} onChange={this.changeCurrentPassword}
                                   value={this.state.current_password}/>
                            <label>Current Password</label>
                        </Cell>
                        <Cell className={"input-field"} small={12} medium={6}>
                            <input type="password" name={"new_password"} onChange={this.changePassword}
                                   value={this.state.password}/>
                            <label>New Password</label>
                        </Cell>
                        <Cell className={"input-field"} small={12} medium={6}>
                            <input type="password" name={"new_password_confirmation"}
                                   onChange={this.changePasswordConfirmation} value={this.state.password_confirmation}/>
                            <label>New Password Confirmation</label>
                        </Cell>
                        <Cell small={12} medium={6}>
                            <Button color={Colors.PRIMARY} onClick={this.profileUpdate}><FontAwesomeIcon icon={faSave}/></Button>
                            <Button color={Colors.ALERT} onClick={this.deleteAccount}><FontAwesomeIcon icon={faTrash}/></Button>
                        </Cell>
                    </Grid>
                </form>
            </Fragment>
        )
    }

    render() {
        const {auth} = this.props
        return auth.token && auth.token !== ""
            ? this.renderOnline()
            : ""
    }
}

function mapStateToProps(state, ownProps) {

    return {
        auth: state.app.auth,
    }
}

export default connect(mapStateToProps)(Profile)