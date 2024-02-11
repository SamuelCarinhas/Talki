import './TextInput.css'
import ITextInput from "./ITextInput.ts";

function TextInput(props: ITextInput) {
    return (
        <div className={"text-input"}>
            <div className={"text-input-header"}>
                <span> { props.name } </span>
                {
                    props.extra && props.extra
                }
            </div>
            <input type={ props.type || "text" }/>
        </div>
    )
}

export default TextInput