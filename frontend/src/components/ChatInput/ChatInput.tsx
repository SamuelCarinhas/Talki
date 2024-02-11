import './ChatInput.css'
import { LuSend } from "react-icons/lu";
import IChatInput from "./IChatInput.ts";
import IconButton from "../IconButton/IconButton.tsx";
import React, { useRef, useState } from "react";

function ChatInput(props: IChatInput) {

    const text = useRef<string>("");
    const [textValue, setTextValue] = useState<string>('')

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        text.current = event.currentTarget.value
        setTextValue(text.current)
    }

    function sendMessage() {
        props.sendMessage(text.current)
        text.current = ''
        setTextValue(text.current)
    }
    const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage()
        }
    };
    return (
        <div className={"chat-input"}>
            <input value={ textValue  } type={"text"} onChange={ handleChange } onKeyDown={ keyDownHandler }/>
            <div className={"chat-input-icons"}>
                <IconButton onClick={ sendMessage }>
                    <LuSend />
                </IconButton>
            </div>
        </div>
    )
}

export default ChatInput