import React, {Fragment} from 'react'
import PropTypes from 'prop-types'


export const FileUploader = ({id, label, click}) => (
    <Fragment>
        <label>{label}</label>
        <input type="file" id={id} />
    </Fragment>
)


FileUploader.propTypes = {
    id: PropTypes.string,
    click: PropTypes.func,
    label: PropTypes.string.isRequired
}