import { useUser } from "./useUser.ts";
import { io } from 'socket.io-client';
import { useEffect, useState } from "react";

export const useWebSocket = () => {

    const { user} = useUser()

    const api = 'http://localhost:8000'
    const socket = io(api)

    const [isConnected, setIsConnected] = useState(socket.connected);
    function onConnect() {
        setIsConnected(true);
        if(user) {
            socket.emit('connect-user', {
                username: user.username,
                accessToken: user.accessToken
            })
        }
    }

    function onDisconnect() {
        setIsConnected(false);
    }

    useEffect(() => {
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, [socket]);

    function sendSocketMessage(message: string) {
        socket.emit('message', {
            message
        })
    }


    return { sendSocketMessage, isConnected }
};
