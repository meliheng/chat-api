import { Request, Response } from "express";
import User from "../models/User";
import { generateToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password)
            return res.status(400).json({ message: "Kullanıcı adı ve şifre zorunludur" });

        const existing = await User.findOne({ username });
        if (existing)
            return res.status(400).json({ message: "Bu kullanıcı zaten kayıtlı" });

        const user = new User({ username, password });
        await user.save();
        const token = generateToken({ id: user._id.toString(), username: user.username });
        res.status(201).json({
            message: "Kayıt başarılı",
            token,
            user: { id: user._id, username: user.username },
        });
    } catch (error) {
        console.error("Kayıt sırasında hata oluştu:", error);
        res.status(500).json({ message: "Kayıt sırasında hata oluştu", error });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user)
            return res.status(404).json({ message: "Kullanıcı bulunamadı" });

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid)
            return res.status(401).json({ message: "Şifre hatalı" });

        const token = generateToken({ id: user._id.toString(), username: user.username });

        res.json({ message: "Giriş başarılı", token });
    } catch (error) {
        res.status(500).json({ message: "Giriş sırasında hata oluştu", error });
    }
};
