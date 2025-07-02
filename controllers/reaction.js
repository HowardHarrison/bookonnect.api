import Reaction from "../models/Reaction";

export const toggleReaction = async (req, res) => {
  const { userId, bookId, type } = req.body;

  try {
    const existing = await Reaction.findOne({ userId, bookId, type });

    if (existing) {
      await existing.remove();
      return res.status(200).json({ message: 'Reaction removed', isReacted: false });
    }

    const newReaction = new Reaction({ userId, bookId, type });
    await newReaction.save();

    return res.status(201).json({ message: 'Reaction added', isReacted: true });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
};