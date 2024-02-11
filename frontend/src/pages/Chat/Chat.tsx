import './Chat.css'
import Page from "../../containers/Page/Page.tsx";
import Protected from "../../containers/Protected/Protected.tsx";
import ChatInput from "../../components/ChatInput/ChatInput.tsx";
import IChatMessage from "../../components/ChatMessage/IChatMessage.ts";
import {useAuth} from "../../hooks/useAuth.ts";
import {useUser} from "../../hooks/useUser.ts";
import ChatMessage from "../../components/ChatMessage/ChatMessage.tsx";
import {useEffect, useRef, useState} from "react";

function Chat() {

    useAuth()
    const { user } = useUser()
    const [messages, setMessages] = useState<IChatMessage[]>([])
    const messagesRef = useRef<IChatMessage[]>([])

    function sendMessage(message: string ){
        console.log(message)
        const messageId = `id-${Math.ceil(Math.random()*10000000)}`
        messagesRef.current.push(
            {
                id: messageId,
                message,
                username: messagesRef.current.length % 2 == 0 ? user!.username : 'Yeet',
                date: new Date()
            }
        )
        const elem = document.getElementById(messageId);
        if(elem) elem.scrollTop = elem.scrollHeight;
        setMessages([...messagesRef.current])
    }

    useEffect(() => {
        if(messages.length > 0) {
            const elem = document.getElementById(messages[messages.length-1].id);
            console.log(elem)
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