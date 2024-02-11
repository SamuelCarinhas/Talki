import './Login.css'
import Page from "../../containers/Page/Page.tsx";
import TextInput from "../../components/TextInput/TextInput.tsx";
import LinkText from "../../components/LinkText/LinkText.tsx";
import Button from "../../components/Button/Button.tsx";

function Login() {
    return (
        <Page>
            <div className={"login"}>
                <div className={"login-container"}>
                    <div className={"login-form"}>
                        <h2>Sign In</h2>
                        <TextInput name={ "Username or email" }/>
                        <TextInput name={ "Password" } type={"password"} extra={
                            <LinkText link={"awd"} text={"Forgot Password?"}/>
                        }/>
                        <Button text={ "Sign In" } onClick={() => alert(1)}/>
                        <span> Don't have an account? <LinkText text={"Sign Up"} link={"teste"}/></span>
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
