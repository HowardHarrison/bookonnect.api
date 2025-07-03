import Review from "../models/Review.js";

// Create or update your review
export const upsertReview = async (req, res) => {
  const { userId, bookId, rating, comment } = req.body;

  if (!userId || !bookId || !rating || !comment) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const review = await Review.findOneAndUpdate(
      { userId, bookId },
      { rating, comment },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all reviews for a book
export const getReviewsByBook = async (req, res) => {
  const { bookId } = req.params;
  try {
    const reviews = await Review.find({ bookId })
      .populate("userId", "firstName profileImage") 
      .sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get your own review
export const getUserReview = async (req, res) => {
  const { userId, bookId } = req.query;
  try {
    const review = await Review.findOne({ userId, bookId });
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete your review
export const deleteReview = async (req, res) => {
  const { userId, bookId } = req.query;
  try {
    await Review.findOneAndDelete({ userId, bookId });
    res.status(200).json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
