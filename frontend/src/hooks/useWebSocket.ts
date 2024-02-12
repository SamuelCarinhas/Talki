import { useUser } from "./useUser.ts";
import { io, Socket } from 'socket.io-client';
import { useEffect, useState } from "react";
import IChatMessage from "../components/ChatMessage/IChatMessage.ts";

export const useWebSocket = (receiveMessage: (message: IChatMessage) => void) => {
    const { user } = useUser();
    const api = 'ws://localhost:8000';
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const newSocket = io(api);
        setSocket(newSocket);

        return () => {
            if (newSocket) {
                newSocket.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        if (!socket) return;

        const handleConnect = () => {
            setIsConnected(true);
            if (user) {
                socket.emit('connect-user', {
                    token: user.accessToken
                });
            }
        };

        const handleDisconnect = () => {
            setIsConnected(false);
        };

        const handleMessage = (payload: IChatMessage) => {
            receiveMessage(payload)
        };

        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);
        socket.on('message', handleMessage);

        return () => {
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnect);
            socket.off('message', handleMessage);
        };
    }, [socket, user]);

    const sendSocketMessage = (message: string) => {
        if (user && isConnected && socket) {
            socket.emit('message', {
                token: user.accessToken,
                message
            });
        }
    };

    return { sendSocketMessage, isConnected };
};