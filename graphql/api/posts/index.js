const db = require("../../database/mysql");
const { errorHandler } = require("../utils");
const intersection = require("lodash/intersection");

module.exports = {
  getPost: async (id) => {
    const posts = db
      .select("*")
      .from("blog_posts")
      .where({ id })
      .catch(errorHandler);

    const comments = await db
      .select("*")
      .from("blog_post_comments")
      .where({ post_id: id })
      .catch(errorHandler);

    let commentAuthorIds = [
      ...new Set(comments.map(({ author_id }) => author_id)),
    ];

    let commentAuthors = await db
      .select("*")
      .from("users")
      .whereIn("id", commentAuthorIds);

    comments.forEach((comment) => {
      let authorUser = commentAuthors.find(
        ({ id }) => id === comment.author_id
      );

      comment.author = `${authorUser.first_name} ${authorUser.last_name}`;
      comment.author_image = authorUser.image;
    });

    let likes = db
      .select("*")
      .from("blog_post_likes")
      .where({ post_id: id })
      .catch(errorHandler);

    let categories = await db
      .select("*")
      .from("blog_post_categories")
      .leftJoin("blog_categories", "category_id", "blog_categories.id")
      .where({ post_id: id });

    let [post] = await posts;

    return {
      ...post,
      comments,
      likes: await likes.length,
      categories: await categories.map(({ label }) => label),
    };
  },

  createPost: async (args) =>
    await db.insert(args.data).then((res) => {
      return res;
    }),

  getPosts: (type, category_ids) => {
    let qry = db
      .select(
        "blog_posts.id",
        "blog_posts.description",
        "blog_posts.author_id",
        "title",
        "image",
        "created_at",
        "updated_at",
        db.raw("GROUP_CONCAT(label) as categories"),
        db.raw("GROUP_CONCAT(blog_categories.id) as cat_ids")
      )
      .from("blog_posts")
      .leftJoin(
        "blog_post_categories",
        "blog_posts.id",
        "blog_post_categories.post_id"
      )
      .leftJoin(
        "blog_categories",
        "blog_post_categories.category_id",
        "blog_categories.id"
      )
      .where({ active: 1 })
      .groupBy("blog_posts.id");

    qry = {
      trending: () =>
        qry
          .select(db.raw("COUNT(blog_post_likes.author_id) as likes"))
          .leftJoin(
            "blog_post_likes",
            "blog_post_likes.post_id",
            "blog_posts.id"
          )
          .groupBy("blog_posts.id")
          .orderBy("likes", "asc")
          .limit(5),

      featured: () => qry.whereIn("blog_posts.id", [1, 2, 3, 4]),

      recent: () => qry.orderBy("updated_at", "desc").limit(5),

      default: () => qry,
    }[type || "default"]();

    return qry
      .then((data) => {
        if (category_ids) {
          return data.filter(
            (post) =>
              post.cat_ids &&
              intersection(post.cat_ids.split(",").map(parseInt), category_ids)
                .length
          );
        }
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getPostsLikeCounts: async (ids) =>
    await db
      .select("COUNT(author_id) as likes", "post_id")
      .from("blog_post_likes")
      .groupBy("post_id")
      .whereIn("post_id", ids)
      .catch(errorHandler),

  getPostComments: async (id) =>
    await db
      .select("*")
      .from("blog_post_comments")
      .where("post_id", id)
      .catch(errorHandler),

  getPostsAuthors: async (ids) =>
    await db.select("*").from("users").where("id", ids).catch(errorHandler),
};
