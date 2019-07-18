import React, {Fragment} from 'react'
import PropTypes from 'prop-types'


export const FileUploader = ({id, label, ...rest}) => (
    <Fragment>
        <label>{label}</label>
        <input type="file" id={id} {...rest} accept={"audio/mp3, audio/wav, image/png, image/jpeg, video/mp4"} />
    </Fragment>
)


FileUploader.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string.isRequired
}