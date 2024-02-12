import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { authorizeAccount } from "../auth.middleware";
import { AccessToken, ChatMessage, Command } from "../utils/types.util";
import logger from "../utils/logger.util";
import { randomUUID } from "node:crypto";

function TalkiServer(io: Server<DefaultEventsMap, DefaultEventsMap>) {
    const users: { [id: string]: any } = {}

    const defaultRoom = 'general'

    function notifyRoom(room: string, command: Command) {
        logger.info(`ROOM-BROADCAST | ${(new Date()).toUTCString()} | TYPE: ${command.type}`);
        io.to(room).emit(command.type, command.payload);
    }

    function connectUser(socket: Socket<DefaultEventsMap, DefaultEventsMap>) {
        return function (payload: any) {
            new Promise(() => {
                authorizeAccount(payload.token, (user: AccessToken) => {
                    socket.join(defaultRoom)
                    logger.info(`${user.email} connected`)
                    users[socket.id] = payload
                })
            })
        }
    }

    function disconnectUser(socket: Socket<DefaultEventsMap, DefaultEventsMap>) {
        return function () {
            new Promise(() => {
                logger.info(`disconnected`)
                socket.leave(defaultRoom)
                delete users[socket.id]
            })
        }
    }

    function sendMessage(socket: Socket<DefaultEventsMap, DefaultEventsMap>) {
        return function (payload: any) {
            new Promise(() => {
                authorizeAccount(payload.token, (user: AccessToken) => {
                    if (!payload.message) return;
                    const message: ChatMessage = {
                        message: payload.message,
                        username: user.user,
                        date: new Date(),
                        id: `${user.user}-${randomUUID()}`
                    }

                    const command: Command = {
                        type: 'message',
                        payload: message
                    }

                    notifyRoom(defaultRoom, command)
                })
            })
        }
    }

    return { users, connectUser, sendMessage, disconnectUser }
}

export default TalkiServer