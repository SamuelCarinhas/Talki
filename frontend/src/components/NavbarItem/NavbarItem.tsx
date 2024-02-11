import INavbarItem from "./INavbarItem.ts";

function NavbarItem(props: INavbarItem) {
    return (
        <div className={"navbar-item"}>
            <h1> { props.name } </h1>
        </div>
    )
}

export default NavbarItem