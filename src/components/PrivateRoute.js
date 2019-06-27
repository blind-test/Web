import React from 'react'
import PropTypes from 'prop-types'
import {connect, Provider} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'

function mapStateToProps(state, ownProps){
    console.log("mapStateToProps: PrivateRoute");
    return {
        auth: state.app.auth,

    };
}

export default connect(mapStateToProps)(PrivateRoute)