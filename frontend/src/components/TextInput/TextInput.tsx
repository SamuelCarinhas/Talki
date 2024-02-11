import './TextInput.css'
import ITextInput from "./ITextInput.ts";
import React from "react";

function TextInput(props: ITextInput) {

    function handleClick() {
        if(props.setError)
            props.setError(null)
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        props.text.current = event.target.value
        if(props.error && props.setError)
            props.setError(null)
    }

    return (
        <div className={`text-input ${props.error ? "text-input-error" : ""}`} >
            <div className={`text-input-header ${props.error ? "text-input-error" : ""}`}>
                <span> {props.name} </span>
                {
                    props.extra && props.extra
                }
            </div>
            <input
                className={props.error ? "text-input-error" : ""}
                type={props.type || "text"}
                onClick={ handleClick }
                onChange={ handleChange }
            />
            {
                props.error && <span className={props.error ? "text-input-error" : ""}> {props.error} </span>
            }
        </div>
    )
}

export default TextInput