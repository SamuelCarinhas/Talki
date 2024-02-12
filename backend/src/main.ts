import dotenv from 'dotenv';
dotenv.config();

import { Server } from "socket.io";
import { createServer } from 'http';

import TalkiServer from "./server/handler.server";
import logger from "./utils/logger.util";



const host = process.env.HOST || 'localhost';
const port = Number(process.env.PORT) || 8000;

const httpServer = createServer();
export const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});

const server = TalkiServer(io)

io.on('connection', (socket) => {
    socket.on('disconnect', server.disconnectUser(socket));

    socket.on('connect-user', server.connectUser(socket))

    socket.on('message', server.sendMessage(socket))
})

httpServer.listen(port, () => {
    logger.info(`Server listening on port: ${port}`);
});