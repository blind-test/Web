import React, {Fragment} from 'react'
import PropTypes from 'prop-types'


export const FileUploader = ({id, label, ...rest}) => (
    <Fragment>
        <label>{label}</label>
        <input type="file" id={id} {...rest} />
    </Fragment>
)


FileUploader.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string.isRequired
}