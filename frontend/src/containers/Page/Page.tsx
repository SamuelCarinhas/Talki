import './Page.css'
import IPage from "./IPage.ts";
import Navbar from "../../components/Navbar/Navbar.tsx";

function Page(props: IPage) {
    return (
        <div className={"page"}>
            <Navbar />
            { props.children }
        </div>
    )
}

export default Page
