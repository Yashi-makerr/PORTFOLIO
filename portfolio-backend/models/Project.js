const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: [{ type: String }], // ["HTML", "CSS", "JS"]
    githubUrl: { type: String },
    liveUrl: { type: String },
    imageUrl: { type: String },
    highlight: { type: Boolean, default: false }, // home pe highlight karna hai ya nahi
    sortOrder: { type: Number, default: 0 },      // order control karne ke liye
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
