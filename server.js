const express = require('express');
const session = require('express-session');
const { engine } = require('express-handlebars');
const path = require('path');
require('dotenv').config();

const app = express();

// Set up Handlebars with the correct paths for 'layoutsDir'
app.engine('handlebars', engine({
  layoutsDir: path.join(__dirname, 'Views', 'layouts'),
}));
app.set('view engine', 'handlebars');
// Set the directory where the views (Handlebars templates) will be looked for
app.set('views', path.join(__dirname, 'Views'));

// Set up session middleware with options
app.use(session({
  secret: process.env.SESSION_SECRET, // Use a secret from .env for session encryption
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' } 
}));

// Define a middleware to check user's login status
const checkAuth = (req, res, next) => {
  req.isUserSignedIn = !!req.session.userId; 
  next();
};

// Apply the checkAuth middleware to all routes
app.use(checkAuth);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'Public')));

// Define the home route
app.get('/', (req, res) => {
  res.render('main', { layout: 'main', signed_up: req.isUserSignedIn });
});

// Define the route for the sign-up page
app.get('/signup', (req, res) => {
  res.render('logIn', { layout: 'main' });
});

// Start the server on the specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
