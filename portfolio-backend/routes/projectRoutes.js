const express = require('express');
const Project = require('../models/Project');

const router = express.Router();

// GET /api/projects  → public: projects list (portfolio me use hoga)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ sortOrder: 1, createdAt: -1 });
    return res.json(projects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    return res.status(500).json({ error: 'Server error while fetching projects' });
  }
});

// POST /api/projects  → admin use (Thunder Client se add karne ke liye)
router.post('/', async (req, res) => {
  const { title, description, techStack, githubUrl, liveUrl, imageUrl, highlight, sortOrder } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title aur description zaroori hai' });
  }

  try {
    const project = await Project.create({
      title,
      description,
      techStack,
      githubUrl,
      liveUrl,
      imageUrl,
      highlight,
      sortOrder,
    });

    return res.status(201).json(project);
  } catch (err) {
    console.error('Error creating project:', err);
    return res.status(500).json({ error: 'Server error while creating project' });
  }
});

module.exports = router;
