import React from 'react'
import './MyForm.css';
function myForm({ props, children }) {
    return (
        <>
            <h1 className={props.titleclassname}>{props.titlevalue}</h1>
            <form {...props}>
                {children}
            </form>
        </>
    )
}

export default myForm