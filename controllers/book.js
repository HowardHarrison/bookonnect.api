import Book from "../models/Book.js";

export const getBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('categories', 'name').populate('writer', 'name');;
        console.log('books', JSON.stringify(books, null, 2));
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
        console.log('book',book);
        res.status(200).json(book);
    } catch (err) {
        console.error("Error fetching book by ID:", err.message);
        res.status(500).json({ message: "Server error while fetching book." });
    }
};