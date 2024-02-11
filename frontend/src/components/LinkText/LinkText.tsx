import './LinkText.css'
import { Link } from "react-router-dom";
import ILinkText from "./ILinkText.ts";

function LinkText(props: ILinkText) {
    return (
        <Link className={"link-text"} to={ props.link }> { props.text } </Link>
    )
}

export default LinkText
