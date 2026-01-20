import Reaction from '../../models/Reaction.js';

export const toggleReaction = async (req, res) => {
  const { userId, bookId } = req.body;

  if (!userId || !bookId) {
    return res.status(400).json({ message: "Missing userId or bookId" });
  }

  try {
    const existing = await Reaction.findOne({ userId, bookId });

    if (existing) {
      const deleted = await Reaction.findOneAndDelete({ userId, bookId });
      if (deleted) {
        return res.status(200).json({ message: 'Reaction removed', reacted: false });
      }
      return res.status(200).json({ message: 'Reaction removed', reacted: false });
    } else {
      const newReaction = new Reaction({ userId, bookId });
      await newReaction.save();
      return res.status(201).json({ message: 'Reaction added', reacted: true });
    }
  } catch (err) {
    console.error('Toggle error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};


export const getReactionStatus = async (req, res) => {
  const { userId, bookId } = req.query;

  if (!userId || !bookId) {
    return res.status(400).json({ message: 'Missing userId or bookId' });
  }

  try {
    const reaction = await Reaction.findOne({ userId, bookId });
    res.status(200).json({ reacted: !!reaction });
  } catch (error) {
    console.error('Error getting reaction status:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllReactionStatus = async (req, res) => {
  const { bookId } = req.query;
  if (!bookId) {
    return res.status(400).json({ message: 'Missing bookId' });
  }

  try {
    const totalReactions = await Reaction.countDocuments({ bookId });
    res.status(200).json({ totalReactions });
  } catch (error) {
    console.error('Error getting reaction status:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
}

