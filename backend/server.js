 import express from 'express'
import cors from 'cors'
import {Server} from 'socket.io'
import http from 'http'
import UserRouter from './routes/user.routes.js'


const app = express()
const server = http.createServer(app)

app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
}))

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true
    }
})

app.use('/api/users', UserRouter)


io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });

    socket.on("send_message", (data) => {
        console.log(`Message received: ${data}`);
        io.emit("receive_message", data);
    });
});


const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});