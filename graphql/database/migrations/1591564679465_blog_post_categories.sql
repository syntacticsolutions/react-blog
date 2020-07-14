CREATE TABLE IF NOT EXISTS blog_post_categories (
    post_id INT(12) NOT NULL,
    category_id INT(12) NOT NULL,
    UNIQUE KEY(post_id, category_id),
    CONSTRAINT fk_bpcatpost FOREIGN KEY (post_id)
    REFERENCES blog_posts(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT fk_bpcatcategory FOREIGN KEY (category_id)
    REFERENCES blog_categories(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)