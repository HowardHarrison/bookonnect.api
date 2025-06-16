import mongoose from "mongoose";

const LoveReactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  },
  { timestamps: true }
);

LoveReactionSchema.index({ user: 1, book: 1 }, { unique: true });

const LoveReaction = mongoose.model("LoveReaction", LoveReactionSchema);
export default LoveReaction;
