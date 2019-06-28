import React from 'react'
import PropTypes from 'prop-types'

export const PrettyColorType = Object.freeze({PRIMARY: "primary", SUCCESS: "success",DANGER:"danger",WARNING: "warning",INFO: "info"});
export const PrettyColorShape = Object.freeze({CURVE: "curve", ROUND:"round"});

export const Radio = ({type, shape, name, label}) => (
    <div className={`pretty p-default p-${shape}`}>
        <input type="radio" name={name}/>
        <div className={`state p-${type}-o`}>
            <label>{label}</label>
        </div>
    </div>
)

Radio.propTypes = {
    type: PropTypes.oneOf(Object.values(PrettyColorType)).isRequired,
    shape: PropTypes.oneOf(Object.values(PrettyColorShape)).isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
}