import mongoose from "mongoose";

const Schema = mongoose.Schema;

const urlSchema = new Schema({
    url: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    accessCount: { type: Number, default: 0 }
});

export default mongoose.model("Url", urlSchema);