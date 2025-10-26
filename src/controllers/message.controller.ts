import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";

export const getMessages = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ message: "Kullanıcı bulunamadı" });

    res.json({ message: "Mesajlar getirildi" });
};