import mongoose from "mongoose";

const ReactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  },
  { timestamps: true }
);

ReactionSchema.index({ userId: 1, bookId: 1 }, { unique: true });

const Reaction = mongoose.model("Reaction", ReactionSchema);
export default Reaction;
