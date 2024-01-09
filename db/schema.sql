USE gg_db;

-- Table to track posts and images interactions
CREATE TABLE user_posts (
    postId INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    imageUrl VARCHAR(255),
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
    publishedAt DATETIME,
    FOREIGN KEY (userId) REFERENCES users(userId)
);

-- Table to track user interactions with posts such as creating, viewing, and liking
CREATE TABLE post_interaction (
    interactionId INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    postId INTEGER NOT NULL,
    userId INTEGER NOT NULL,
    interactionType ENUM('created', 'viewed', 'liked') NOT NULL,
    interactionTimestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (postId) REFERENCES user_posts(postId),
    FOREIGN KEY (userId) REFERENCES users(userId)
);

-- Table to track comments on posts
CREATE TABLE post_comments (
    commentId INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    postId INTEGER NOT NULL,
    userId INTEGER NOT NULL,
    content TEXT NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (postId) REFERENCES user_posts(postId),
    FOREIGN KEY (userId) REFERENCES users(userId)
);

-- Table to track image uploads by users
CREATE TABLE image_uploads (
    imageId INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId INTEGER NOT NULL,
    imageUrl VARCHAR(255) NOT NULL,
    uploadTimestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(userId)
);

-- The tag and post_tag tables can remain as they are if you're using tags for posts.
-- You can also consider adding a 'likes' table if you want to track which users like which posts.
CREATE TABLE post_likes (
    likeId INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    postId INTEGER NOT NULL,
    userId INTEGER NOT NULL,
    likedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (postId) REFERENCES user_posts(postId),
    FOREIGN KEY (userId) REFERENCES users(userId)
);
