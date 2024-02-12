import './Register.css'
import Page from "../../containers/Page/Page.tsx";
import TextInput from "../../components/TextInput/TextInput.tsx";
import LinkText from "../../components/LinkText/LinkText.tsx";
import Button from "../../components/Button/Button.tsx";
import React, { useRef, useState } from "react";
import { useRest } from "../../hooks/useRest.ts";

import { AiOutlineLoading } from "react-icons/ai";
import {useUser} from "../../hooks/useUser.ts";
import {Navigate} from "react-router-dom";

function Register() {

    const [waiting, setWaiting] = useState<boolean>(false)
    const [create, setCreated] = useState<boolean>(false)

    const { host, post } = useRest()
    const { user } = useUser()

    const username = useRef<string>("")
    const password = useRef<string>("")
    const email = useRef<string>("")

    const [passwordError, setPasswordError] = useState<string | null>(null)
    const [usernameError, setUsernameError] = useState<string | null>(null)
    const [emailError, setEmailError] = useState<string | null>(null)

    const validateEmail = (email: string) => {
        return email.match(
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        );
    };

    function handleRegister(event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault()
        setWaiting(true)

        const isEmailValid = validateEmail(email.current);

        if(username.current.length == 0) {
            setUsernameError("Empty username")
        }
        if(password.current.length == 0) {
            setPasswordError("Empty password")
        }
        if(!isEmailValid) {
            setEmailError("Invalid email")
        }

        if(username.current.length == 0 || password.current.length == 0 || !isEmailValid) {
            setWaiting(false)
            return;
        }

        post('/signup', {
            username: username.current,
            email: email.current,
            password: password.current,
            callback: `${host}/verify`
        }).then(async res => {
            return {
                json: await res.json(),
                status: res.status
            }
        }).then(({ status }) => {
            switch (status) {
                case 409:
                    setPasswordError(null)
                    setUsernameError('An account already exists with this email or username')
                    setEmailError('An account already exists with this email or username')
                    break;
                case 400:
                    setPasswordError('Your password needs to contains at least: 8 length, 1 lower and uppercase character, 1 number')
                    setUsernameError(null)
                    setEmailError(null)
                    break;
                case 201:
                    setCreated(true);
                    setPasswordError(null)
                    setUsernameError(null)
                    setEmailError(null)
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
        user && user.email !== 'invalid' ? <Navigate to={"/"} />
            :
        <Page>
            <div className={"register"}>
                <div className={"register-container"}>
                    <div className={"register-form"}>
                        {
                            waiting &&
                            <div className={"register-waiting"}>
                                <AiOutlineLoading className='gallery-loading-item' size={60} />
                            </div>
                        }
                        { create &&
                            <div className={"register-created"}>
                                <h3 className={"register-success"}>Account created</h3>
                                <h3>Please verify your email to validate your account</h3>
                            </div>
                        }
                        <h2>Sign Up</h2>
                        <TextInput
                            name={ "Username" }
                            text={ username }
                            error={ usernameError }
                            setError={ setUsernameError }/>
                        <TextInput
                            name={ "Email" }
                            text={ email }
                            error={ emailError }
                            setError={ setEmailError }/>
                        <TextInput
                            name={ "Password" }
                            text={ password }
                            type={"password"}
                            error={ passwordError }
                            setError={ setPasswordError }/>
                        <Button text={ "Sign Up" } onClick={ handleRegister }/>
                        <span>Already have an account? <LinkText text={"Sign In"} link={"/signin"}/></span>
                    </div>
                    <div className={"register-image"}>
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

export default Register
