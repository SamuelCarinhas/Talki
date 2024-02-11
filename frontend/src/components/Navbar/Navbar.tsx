import './Navbar.css'
import INavbarItem from "../NavbarItem/INavbarItem.ts";
import NavbarItem from "../NavbarItem/NavbarItem.tsx";

function Navbar() {

    const items: INavbarItem[] = [
        {
            name: 'Home'
        },
        {
            name: 'Chat'
        },
        {
            name: 'Login'
        }
    ]

    return (
        <div className={"navbar"}>
            {
                items.map((item, index) => <NavbarItem key={index} name={ item.name }/>)
            }
        </div>
    )
}

export default Navbar
