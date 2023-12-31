DROP DATABASE IF EXISTS gg_db;
CREATE DATABASE gg_db;
USE gg_db;

CREATE TABLE users (
	userId INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
	firstName VARCHAR(30) DEFAULT NULL,
	lastName VARCHAR(30) DEFAULT NULL,
	username VARCHAR(30) NOT NULL UNIQUE,
	email VARCHAR(50) NOT NULL UNIQUE,
	passwordHash VARCHAR(32) NOT NULL,
	registeredAt DATETIME DEFAULT NULL ,
	lastLogin DATETIME DEFAULT NULL ,
	intro TINYTEXT

);


CREATE TABLE games (
	gameId INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
	game_title VARCHAR(30) NOT NULL,
	users_playing INTEGER
);
    

CREATE TABLE game_collection (
	id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
	gameId INTEGER NOT NULL  REFERENCES games(gameId),
	userId INTEGER NOT NULL REFERENCES users(userId)
);
    
CREATE TABLE post (
	id INTEGER NOT NULL AUTO_INCREMENT,
	authorId INTEGER NOT NULL,
	parentId INTEGER DEFAULT NULL,
	title VARCHAR(75) NOT NULL,
	slug VARCHAR(100) NOT NULL,
	summary TINYTEXT,
	createdAt DATETIME NOT NULL,
	updatedAt DATETIME DEFAULT NULL,
	publishedAt DATETIME DEFAULT NULL,
	content TEXT  ,
	PRIMARY KEY (id),
	UNIQUE KEY uq_slug (slug),
	KEY idx_post_user (authorId),
	KEY idx_post_parent (parentId),
	CONSTRAINT fk_post_parent FOREIGN KEY (parentId) REFERENCES post (id),
	CONSTRAINT fk_post_user FOREIGN KEY (authorId) REFERENCES users (userId)
); 

CREATE TABLE post_comment (
	id INTEGER NOT NULL AUTO_INCREMENT,
	postId INTEGER NOT NULL,
	parentId INTEGER DEFAULT NULL,
	title VARCHAR(100) NOT NULL,
	createdAt DATETIME NOT NULL,
	publishedAt DATETIME DEFAULT NULL,
	content TEXT,
	PRIMARY KEY (id),
	KEY idx_comment_post (postId),
	KEY idx_comment_parent (parentId),
	CONSTRAINT fk_comment_parent FOREIGN KEY (parentId) REFERENCES post_comment (id),
	CONSTRAINT fk_comment_post FOREIGN KEY (postId) REFERENCES post (id)
); 

CREATE TABLE tag (
	id INTEGER NOT NULL AUTO_INCREMENT,
	title VARCHAR(75) NOT NULL,
	slug VARCHAR(100) NOT NULL,
	content TEXT,
	PRIMARY KEY (id)
);

CREATE TABLE post_tag (
	postId INTEGER NOT NULL,
	tagId INTEGER NOT NULL,
	PRIMARY KEY (postId, tagId),
	KEY idx_pt_tag (tagId),
	KEY idx_pt_post (postId),
	CONSTRAINT fk_pt_post FOREIGN KEY (postId) REFERENCES post (id),
	CONSTRAINT fk_pt_tag FOREIGN KEY (tagId) REFERENCES tag (id)
);
