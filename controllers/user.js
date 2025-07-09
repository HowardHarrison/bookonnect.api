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

export const toggleSavedBook = async (req, res) => {
  const { userId } = req.params;
  const { bookId } = req.body;

  if (!bookId) {
    return res.status(400).json({ message: 'Book ID is required' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const exists = user.savedBooks.includes(bookId);
    if (exists) {
      user.savedBooks = user.savedBooks.filter(id => id.toString() !== bookId);
    } else {
      user.savedBooks.push(bookId);
    }

    await user.save();
    res.status(200).json({
      message: exists ? 'Book removed' : 'Book added',
      savedBooks: user.savedBooks
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};