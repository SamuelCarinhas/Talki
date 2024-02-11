import './NavbarItem.css'
import INavbarItem from "./INavbarItem.ts";
import { useNavigate } from "react-router-dom";

function NavbarItem(props: INavbarItem) {

    const navigate = useNavigate()

    function handleClick() {
        navigate(props.to)
    }

    return (
        <div className={"navbar-item"} onClick={ handleClick }>
            <h1> { props.name } </h1>
        </div>
    )
}

export default NavbarItem