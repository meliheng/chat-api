import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";
import messageRoutes from "./routes/message.route";
import roomRoutes from "./routes/room.routes";
import { protect } from "./middleware/authMiddleware";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";


const app = express();

const server = http.createServer(app);
export const io = new Server(server, { cors: { origin: "*" } }); // ⚡ io export ettik

io.on("connection", (socket) => {
    console.log("Bir kullanıcı bağlandı", socket.id);
});

dotenv.config();
app.use(cors())
app.use(express.json());
// Mongo bağlantısı
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/rooms", protect, roomRoutes);
app.get("/", (req: Request, res: Response) => {
    res.send("Chat API (TypeScript) çalışıyor 🚀");
});

app.listen(5000, () => {
    console.log("Server 5000 portunda çalışıyor ✅");
});