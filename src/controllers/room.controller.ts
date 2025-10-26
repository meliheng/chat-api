import { AuthRequest } from "../middleware/authMiddleware";
import Room from "../models/Room";
import { Response } from "express";
import { io } from "../index"; // Socket.io objesini import ettik

export const createRoom = async (req: AuthRequest, res: Response) => {
    try {
        const { name } = req.body;
        const room = new Room({ name, members: [req.user?.id] });
        await room.save();
        // ⚡ Socket ile tüm kullanıcılara oda oluşturuldu bilgisini gönder
        io.emit("newRoom", {
            id: room._id,
            name: room.name,
            members: room.members,
        });
        res.status(201).json(room);
    } catch (error) {
        res.status(500).json({ message: "Oda oluşturma hatası", error });
    }
};