 import express from 'express'
import cors from 'cors'
import {Server} from 'socket.io'
import http from 'http'
import mongoose from 'mongoose'
import UserRouter from './routes/user.routes.js'
import MessageRouter from "./routes/message.routes.js";
import ConversationRouter from './routes/conversation.route.js'


const app = express()
const server = http.createServer(app)

app.use(express.json())

// Middleware to attach io to req
app.use((req ,res , next)=>{
    req.io = io
    next()
})

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

// Routes
app.use('/api/users', UserRouter)
app.use("/api/messages", MessageRouter);
app.use('/api/conversations/', ConversationRouter);



mongoose.connect(`${process.env.MONGO_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
)




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