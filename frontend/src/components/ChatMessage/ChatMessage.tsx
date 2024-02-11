import './ChatMessage.css'
import IChatMessage from "./IChatMessage.ts";
import {useAuth} from "../../hooks/useAuth.ts";
import {useUser} from "../../hooks/useUser.ts";

function ChatMessage(props: IChatMessage) {
    useAuth()
    const { user } = useUser()

    return (
        <div id={props.id} className={`chat-message ${user!.username !== props.username && 'chat-message-other'}`}>
            <div className={"chat-message-content"}>
                <div className={"chat-message-author"}>{props.username}</div>
                <div className={"chat-message-info"}>{props.message}</div>
                <div className={"chat-message-date"}>{props.date.toDateString()}</div>
            </div>
            <img className={"chat-profile-img"}
                 src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                 alt={ props.username }/>
        </div>
    )
}

export default ChatMessage
