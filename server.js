const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

// Set up Handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Set up session middleware
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true } // use secure: true in production with HTTPS
}));

// Define a middleware to check user's login status
const checkAuth = (req, res, next) => {
  if (req.session.userId) {
    // User is logged in
    req.isUserSignedIn = true;
  } else {
    // User is not logged in
    req.isUserSignedIn = false;
  }
  next();
};

// Apply the middleware to all routes
app.use(checkAuth);

// Serve static files from the 'Public' directory
app.use(express.static(path.join(__dirname, 'Public')));

// Define your routes
app.get('/', (req, res) => {
  res.render('main', { signed_up: req.isUserSignedIn });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
