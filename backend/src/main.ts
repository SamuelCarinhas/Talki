import dotenv from 'dotenv';
import { Server } from "socket.io";
import { createServer } from 'http';

import logger from './utils/logger.util';

dotenv.config();

const host = process.env.HOST || 'localhost';
const port = Number(process.env.PORT) || 8000;

const httpServer = createServer();
export const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});

const users: { [id: string] : any } = {}

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        delete users[socket.id]
    });

    socket.on('connect-user', (payload) => {
        console.log(payload)
        users[socket.id] = payload
    })

    socket.on('message', (payload) => {
        console.log(payload.message, users[socket.id])
    })
})

httpServer.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});