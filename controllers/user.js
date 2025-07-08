import Book from '../models/Book.js';
import User from '../models/User.js';

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const removeSavedBook = async (req, res) => {
  const { userId } = req.params;
  const { bookId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.savedBooks = user.savedBooks.filter(id => id.toString() !== bookId);
    await user.save();

    res.status(200).json(user); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};