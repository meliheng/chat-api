import express from "express";
import { protect } from "../middleware/authMiddleware";
import { getMessages } from "../controllers/message.controller";

const router = express.Router();

// Bu route artık sadece giriş yapmış kullanıcılar tarafından erişilebilir
router.get("/", protect, getMessages);

export default router;