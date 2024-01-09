// seed.js
const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'gg_db'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }

  console.log('Connected to database with ID ' + connection.threadId);
});

// Function to clear existing data and seed the database
const seedDatabase = () => {
  // Define your SQL queries for seeding data here
  const queries = [
    `DELETE FROM users;`,
    `DELETE FROM user_posts;`,
    `DELETE FROM post_interaction;`,
    `DELETE FROM post_comments;`,
    `DELETE FROM image_uploads;`,
    // Add seed data for 'users'
    `INSERT INTO users (firstName, lastName, username, email, passwordHash, registeredAt) VALUES
      ('John', 'Doe', 'johndoe', 'john@example.com', 'hashedpassword', NOW()),
      ('Jane', 'Smith', 'janesmith', 'jane@example.com', 'hashedpassword', NOW());`,
    // Add seed data for 'user_posts'
    `INSERT INTO user_posts (userId, title, content, imageUrl, createdAt) VALUES
      (1, 'First Post', 'This is the first post content', 'http://example.com/image1.jpg', NOW()),
      (2, 'Second Post', 'This is the second post content', 'http://example.com/image2.jpg', NOW());`,
    // Add seed data for 'post_interaction'
    `INSERT INTO post_interaction (postId, userId, interactionType) VALUES
      (1, 1, 'created'),
      (2, 2, 'created');`,
    // Add seed data for 'post_comments'
    `INSERT INTO post_comments (postId, userId, content) VALUES
      (1, 2, 'Nice post!'),
      (2, 1, 'Thanks for sharing!');`,
    // Add seed data for 'image_uploads'
    `INSERT INTO image_uploads (userId, imageUrl) VALUES
      (1, 'http://example.com/uploaded1.jpg'),
      (2, 'http://example.com/uploaded2.jpg');`,
  ];

  // Execute each query in the array
  queries.forEach((query) => {
    connection.query(query, (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      console.log('Query executed successfully');
    });
  });

  // Close the connection when done
  connection.end();
};

// Run the seed function
seedDatabase();
