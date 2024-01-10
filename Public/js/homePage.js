const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Set up storage engine for multer (file uploads)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'Public', 'uploads')) // Ensure the uploads directory exists
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

// Mock database for recipes
const recipes = [];

// Home page route
router.get('/', (req, res) => {
  res.render('homePage', { recipes: recipes }); // Assumes homePage.handlebars is set up correctly
});

// File upload route
router.post('/upload', upload.single('image'), (req, res) => {
  const { title, description } = req.body;
  const imageUrl = `/uploads/${req.file.filename}`; // Adjust according to your static files setup

  recipes.push({ title, description, imageUrl });

  res.redirect('/');
});

module.exports = { router, recipes };
