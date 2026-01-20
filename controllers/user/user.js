import User from '../models/User.js';
import fs from 'fs';
import path from 'path';
import bcrypt from "bcrypt";

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

export const updateUserData = async (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName, email, password } = req.body;

  console.log('file', req.file);

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    // if (req.file && user.profileImage) {
    //   const newImageRelativePath = path.relative(path.join(__dirname, '..', 'public'), req.file.path).replace(/\\/g, '/');

    //   // Only delete old image if it’s different
    //   if (user.profileImage && user.profileImage !== newImageRelativePath) {
    //     const oldImagePath = path.join(__dirname, '..', 'public', user.profileImage);
    //     if (fs.existsSync(oldImagePath)) {
    //       fs.unlinkSync(oldImagePath);
    //       console.log('Old image deleted successfully');
    //     } else {
    //       console.warn('Old image not found:', oldImagePath);
    //     }
    //   }

    //   updateFields.profileImage = newImageRelativePath;
    // }

    const updateFields = {
      firstName,
      lastName,
      email,
    };

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    if (password) {
      updateFields.password = passwordHash;
    }

    if (req.file) {
      updateFields.profileImage = `assets/${req.file.filename}`;
    }

    await User.findByIdAndUpdate(userId, updateFields);
    res.status(200).json({ message: 'User updated successfully.' });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: error });
  }
}