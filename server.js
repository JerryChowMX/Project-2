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
  secret: process.env.SESSION_SECRET,
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

// Serve static files from the 'Public' directory
app.use(express.static(path.join(__dirname, 'Public')));

// Define the route for the home page
app.get('/', (req, res) => {
  if (!req.isUserSignedIn) {
    res.render('homePage'); // Render the homePage.handlebars view if the user is signed in
  } else {
    res.redirect('/'); // Redirect to the login page if the user is not signed in
  }
});

// Define the route for the login/sign-up page
app.get('/logIn', (req, res) => {
  if (!req.isUserSignedIn) {
    res.render('logIn'); // Render the logIn.handlebars view if the user is not signed in
  } else {
    res.redirect('/'); // Redirect to the home page if the user is already signed in
  }
});

// Start the server on the specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});