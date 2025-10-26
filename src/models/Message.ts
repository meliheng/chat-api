import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
    room: string; // room id
    sender: string; // user id
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<IMessage> = new Schema(
    {
        room: { type: String, ref: "Room", required: true },
        sender: { type: String, ref: "User", required: true },
        content: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model<IMessage>("Message", MessageSchema);
