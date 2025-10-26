import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";

dotenv.config();
const app = express();
app.use(express.json());
// Mongo bağlantısı
connectDB();

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Chat API (TypeScript) çalışıyor 🚀");
});

app.listen(5000, () => {
    console.log("Server 5000 portunda çalışıyor ✅");
});