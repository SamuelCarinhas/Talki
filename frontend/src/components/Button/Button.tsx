import './Button.css'
import IButton from "./IButton.ts";

function Button(props: IButton) {
    return (
        <div className={"button"} onClick={ props.onClick }>
            <span> { props.text } </span>
        </div>
    )
}

export default Button
