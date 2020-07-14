CREATE TABLE IF NOT EXISTS blog_post_likes (
    post_id INT(12) NOT NULL,
    author_id INT(12) NOT NULL,
    UNIQUE KEY(post_id, author_id),
    CONSTRAINT fk_bplpost FOREIGN KEY(post_id)
    REFERENCES blog_posts(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT fk_bplauthor FOREIGN KEY(author_id)
    REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)