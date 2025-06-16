import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    publishDate: Date,
    coverImageUrl: String,
    writer: { type: mongoose.Schema.Types.ObjectId, ref: "Writer" },
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", BookSchema);
export default Book;
