import './Login.css'
import Page from "../../containers/Page/Page.tsx";

function Login() {
    return (
        <Page>
            <div className={"login"}>
                <div className={"login-container"}>
                    <div className={"login-form"}>

                    </div>
                    <div className={"login-image"}>
                        <img
                            src={"https://www.targetfirst.com/wp-content/uploads/2021/03/clictochat-e1620817319308.png"}
                            alt={"Chat"}
                        />
                    </div>
                </div>
            </div>
        </Page>
    )
}

export default Login
