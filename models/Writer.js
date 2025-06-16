import mongoose from "mongoose";

const WriterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    bio: String,
    birthDate: Date,
    nationality: String,
  },
  { timestamps: true }
);

const Writer = mongoose.model("Writer", WriterSchema);
export default Writer;
