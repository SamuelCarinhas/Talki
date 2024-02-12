import './Chat.css'
import Page from "../../containers/Page/Page.tsx";
import Protected from "../../containers/Protected/Protected.tsx";
import ChatInput from "../../components/ChatInput/ChatInput.tsx";
import IChatMessage from "../../components/ChatMessage/IChatMessage.ts";
import ChatMessage from "../../components/ChatMessage/ChatMessage.tsx";
import {useEffect, useRef, useState} from "react";
import {useWebSocket} from "../../hooks/useWebSocket.ts";

function Chat() {

    const { sendSocketMessage,  } = useWebSocket(receiveMessage)
    const [messages, setMessages] = useState<IChatMessage[]>([])
    const messagesRef = useRef<IChatMessage[]>([])

    function receiveMessage(message: IChatMessage) {
        messagesRef.current.push(
            {
                id: message.id,
                message: message.message,
                username: message.username,
                date: new Date(message.date)
            }
        )
        setMessages([...messagesRef.current])
    }

    function sendMessage(message: string){
        sendSocketMessage(message)
    }

    useEffect(() => {
        if(messages.length > 0) {
            const elem = document.getElementById(messages[messages.length-1].id);
            if(elem) elem.scrollIntoView();
        }
    }, [messages])

    return (
        <Protected>
            <Page>
                <div className={"chat"}>
                    <div className={"chat-container"}>
                        <div className={"chat-list"}>

                        </div>
                        <div className={"chat-area"}>
                            <div className={"chat-messages"}>
                                {
                                    messages.map((message, index) =>
                                        <ChatMessage
                                            id={ message.id }
                                            key={ index }
                                            message={ message.message }
                                            username={ message.username }
                                            date={ message.date } />)
                                }
                            </div>
                            <ChatInput sendMessage={ sendMessage }/>
                        </div>
                    </div>
                </div>
            </Page>
        </Protected>
    )
}

export default Chat