import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const urlSchema = new Schema(
  {
    url: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true },
    accessCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Url', urlSchema);
