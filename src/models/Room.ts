import mongoose, { Schema, Document } from "mongoose";

export interface IRoom extends Document {
    name: string;
    members: string[]; // user id listesi
}

const RoomSchema: Schema<IRoom> = new Schema(
    {
        name: { type: String, required: true, unique: true },
        members: [{ type: String, ref: "User" }],
    },
    { timestamps: true }
);

export default mongoose.model<IRoom>("Room", RoomSchema);
