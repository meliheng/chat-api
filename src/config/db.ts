import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("✅ MongoDB Atlas bağlantısı başarılı");
    } catch (error) {
        console.error("❌ MongoDB bağlantı hatası:", error);
        process.exit(1);
    }
};

export default connectDB;
