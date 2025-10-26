import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export interface AuthRequest extends Request {
    user?: { id: string; username: string };
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token bulunamadı, yetkisiz" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verifyToken(token);
        req.user = decoded; // Kullanıcı bilgilerini request’e ekle
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token geçersiz veya süresi dolmuş" });
    }
};
