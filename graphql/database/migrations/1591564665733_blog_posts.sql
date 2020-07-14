CREATE TABLE IF NOT EXISTS blog_posts (
    id INT(12) NOT NULL auto_increment PRIMARY KEY,
    author_id INT(12) NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(200) NOT NULL,
    text MEDIUMTEXT NOT NULL,
    keyword1 VARCHAR(50) NOT NULL,
    keyword2 VARCHAR(50) NOT NULL,
    image VARCHAR(400) NOT NULL,
    bg_src VARCHAR(400) NOT NULL,
    bg_type VARCHAR(10) NOT NULL,
    active TINYINT(1) NOT NULL DEFAULT 0,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX bpauthor_ind (author_id),
    CONSTRAINT fk_bpauthor FOREIGN KEY (author_id)
    REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)