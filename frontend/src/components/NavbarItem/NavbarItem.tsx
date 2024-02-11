import INavbarItem from "./INavbarItem.ts";

function NavbarItem(props: INavbarItem) {
    return (
        <div className={"navbar-item"}>
            { props.name }
        </div>
    )
}

export default NavbarItem