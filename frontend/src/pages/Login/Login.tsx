import './Login.css'
import Page from "../../containers/Page/Page.tsx";
import TextInput from "../../components/TextInput/TextInput.tsx";
import LinkText from "../../components/LinkText/LinkText.tsx";
import Button from "../../components/Button/Button.tsx";
import React, { useRef, useState } from "react";
import { useRest } from "../../hooks/useRest.ts";

import { AiOutlineLoading } from "react-icons/ai";
import {useAuth} from "../../hooks/useAuth.ts";
import {useUser} from "../../hooks/useUser.ts";
import {Navigate} from "react-router-dom";

function Login() {

    const [waiting, setWaiting] = useState<boolean>(false);

    const { post } = useRest();
    const { login } = useAuth();
    const { user } = useUser();

    const username = useRef<string>("");
    const password = useRef<string>("");

    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [usernameError, setUsernameError] = useState<string | null>(null);

    function handleLogin(event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault()
        setWaiting(true)

        if(username.current.length == 0) {
            setUsernameError("Empty username")
        }
        if(password.current.length == 0) {
            setPasswordError("Empty password")
        }

        if(username.current.length == 0 || password.current.length == 0) {
            setWaiting(false)
            return;
        }

        post('/signin', {
            identifier: username.current,
            password: password.current
        }).then(async res => {
            return {
                json: await res.json(),
                status: res.status
            }
        }).then(({ json, status }) => {
            switch (status) {
                case 404:
                    setPasswordError(null)
                    setUsernameError(json.description)
                    break;
                case 401:
                    setPasswordError(json.description)
                    setUsernameError(null)
                    break;
                case 200:
                    setPasswordError(null)
                    setUsernameError(null)
                    login({
                        email: json.email,
                        username: json.username,
                        accessToken: json.accessToken,
                        refreshToken: json.refreshToken,
                        role: json.role
                    })
                    break;
                default:
                    setPasswordError('Server error')
                    setUsernameError('Server error')
                    break;
            }
            setWaiting(false)
        }).catch(() => {
            setPasswordError('Server error')
            setUsernameError('Server error')
            setWaiting(false)
        })
    }

    return (
        user ? <Navigate to={"/"} />
            :
        <Page>
            <div className={"login"}>
                <div className={"login-container"}>
                    <div className={"login-form"}>
                        {
                            waiting &&
                            <div className={"login-waiting"}>
                                <AiOutlineLoading className='gallery-loading-item' size={60} />
                            </div>
                        }
                        <h2>Sign In</h2>
                        <TextInput
                            name={ "Username or email" }
                            text={ username }
                            error={ usernameError }
                            setError={ setUsernameError }/>
                        <TextInput
                            name={ "Password" }
                            text={ password }
                            type={"password"}
                            extra={ <LinkText link={"/forgot-password"} text={"Forgot Password?"}/> }
                            error={ passwordError }
                            setError={ setPasswordError }/>
                        <Button text={ "Sign In" } onClick={ handleLogin }/>
                        <span> Don't have an account? <LinkText text={"Sign Up"} link={"/signup"}/></span>
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
