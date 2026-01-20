import mongoose from "mongoose";
import Book from "../models/Book.js";

export const getBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('categories', 'name').populate('writer', 'name');
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id)
            .populate('writer', 'name')
            .populate('categories', 'name');
        if (!book) {
            return res.status(404).json({ message: "Book not found." });
        }
        console.log('book', book);
        res.status(200).json(book);
    } catch (err) {
        console.error("Error fetching book by ID:", err.message);
        res.status(500).json({ message: "Server error while fetching book." });
    }
};

export const getSavedBooksById = async (req, res) => {
  try {
    let idsParam = req.query.ids;

    if (!idsParam) {
      return res.status(200).json([]);
    }
    const ids = idsParam.split(',').filter(id => mongoose.Types.ObjectId.isValid(id));
    if (ids.length === 0) {
      return res.status(200).json([]); 
    }
    const books = await Book.find({ _id: { $in: ids } })
      .populate('categories', 'name')
      .populate('writer', 'name');
    res.status(200).json(books);
  } catch (err) {
    console.error('Error fetching saved books:', err);
    res.status(500).json({ message: 'Server error while fetching saved books.' });
  }
};
