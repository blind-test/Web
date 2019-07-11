import React from 'react'
import PropTypes from 'prop-types'

export const PrettyColorType = Object.freeze({PRIMARY: "primary", SUCCESS: "success",DANGER:"danger",WARNING: "warning",INFO: "info"});
export const PrettyColorShape = Object.freeze({CURVE: "curve", ROUND:"round"});

export const Radio = ({type, shape, name, label, onChange, ...rest}) => (
    <div className={`pretty p-default p-${shape}`}>
        <input type="radio" name={name} onChange={onChange} {...rest} />
        <div className={`state p-${type}-o`}>
            <label>{label}</label>
        </div>
    </div>
)

export const CheckBox = ({type, shape, name, label, onChange, ...rest}) => (
    <div className={`pretty p-default p-${shape}`}>
        <input type="checkbox" name={name} onChange={onChange} {...rest} />
        <div className={`state p-${type}-o`}>
            <label>{label}</label>
        </div>
    </div>
)

Radio.propTypes = {
    type: PropTypes.oneOf(Object.values(PrettyColorType)).isRequired,
    shape: PropTypes.oneOf(Object.values(PrettyColorShape)).isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    onChange: PropTypes.func
}

CheckBox.propTypes = {
    type: PropTypes.oneOf(Object.values(PrettyColorType)).isRequired,
    shape: PropTypes.oneOf(Object.values(PrettyColorShape)).isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    onChange: PropTypes.func
}