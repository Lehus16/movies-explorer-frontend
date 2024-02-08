import React from 'react'
import './MyInput.css';
function myInput({ props }) {
    return (
        <>
            <p className={props.labelclassname}> {props.labelvalue}</p>
            <input {...props} />
            <span className={props.spanclassname}>{props.spanvalue}</span>
        </>
    )
}

export default myInput