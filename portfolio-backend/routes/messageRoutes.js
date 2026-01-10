const express = require('express');
const Message = require('../models/Message');

const router = express.Router();

// POST /api/messages  → new message save
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, aur message zaroori hai' });
  }

  try {
    const newMessage = await Message.create({ name, email, message });
    return res.status(201).json(newMessage);
  } catch (err) {
    console.error('Error saving message:', err);
    return res.status(500).json({ error: 'Server error while saving message' });
  }
});

// GET /api/messages  → saare messages (latest first)
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    return res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    return res.status(500).json({ error: 'Server error while fetching messages' });
  }
});

module.exports = router;
