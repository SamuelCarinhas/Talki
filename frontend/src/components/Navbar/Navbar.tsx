import './Navbar.css'
import INavbarItem from "../NavbarItem/INavbarItem.ts";
import NavbarItem from "../NavbarItem/NavbarItem.tsx";
import {useAuth} from "../../hooks/useAuth.ts";
import {useUser} from "../../hooks/useUser.ts";
import {useEffect, useState} from "react";

function Navbar() {

    useAuth()
    const { user } = useUser()

    const [items, setItems] = useState<INavbarItem[]>([])

    useEffect(() => {
        if(user) {
            setItems([
                {
                    name: 'Home',
                    to: '/'
                },
                {
                    name: 'Chat',
                    to: '/chat'
                },
                {
                    name: 'Sign out',
                    to: '/signout'
                }
            ])
        } else {
            setItems([
                {
                    name: 'Home',
                    to: '/'
                },
                {
                    name: 'Chat',
                    to: '/chat'
                },
                {
                    name: 'Sign in',
                    to: '/signin'
                }
            ])
        }
    }, [user]);

    return (
        <div className={"navbar"}>
            {
                items.map((item, index) => <NavbarItem key={index} name={ item.name } to={ item.to }/>)
            }
        </div>
    )
}

export default Navbar
