import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

ReviewSchema.index({ user: 1, book: 1 }, { unique: true });

const Review = mongoose.model("Review", ReviewSchema);
export default Review;
