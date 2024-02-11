import './IconButton.css'
import IIconButton from "./IIconButton.ts";

function IconButton(props: IIconButton) {
    return (
        <div className={"icon-button"} onClick={ props.onClick }>
            { props.children }
        </div>
    )
}

export default IconButton
