const db = require('../../database/mysql')
const {errorHandler} = require('../utils')
const intersection = require('lodash/intersection')

module.exports = {
    getPost: async (id) => 
        await db.select('*')
            .from('blog_posts')
            .where({ id })
            .andWhere(function() {
                this.where('active', '=', 1)
            })
            .catch(errorHandler),

    createPost: async (args) => 
        await db.insert(args.data)
            .then(res => {
                return res?.[0] || 0
            }),

    getPosts: (type, category_ids) => {
        let qry = db.select(
                'blog_posts.id',
                'blog_posts.description',
                'blog_posts.author_id',
                'title',
                'image',
                'created_at',
                'updated_at',
                db.raw('GROUP_CONCAT(label) as categories'),
                db.raw('GROUP_CONCAT(blog_categories.id) as cat_ids')
            )
            .from('blog_posts')
            .leftJoin('blog_post_categories', 'blog_posts.id', 'blog_post_categories.post_id')
            .leftJoin('blog_categories', 'blog_post_categories.category_id', 'blog_categories.id')
            .where({active: 1})
            .groupBy('blog_posts.id')
        
        qry = {
            trending: () =>  qry
                .select(db.raw('COUNT(blog_post_likes.author_id) as likes'))
                .leftJoin('blog_post_likes', 'blog_post_likes.post_id', 'blog_posts.id')
                .groupBy('blog_posts.id')
                .orderBy('likes','asc')
                .limit(5),

            featured: () => qry.whereIn('blog_posts.id', [1,2,3,4]),

            recent: () => qry
                .orderBy('updated_at', 'desc')
                .limit(5),

            default: () => qry
        }[type || 'default']()

        return qry.then(data => {
            if (category_ids) {
                return data.filter((post) => 
                    post.cat_ids &&
                        intersection(
                            post.cat_ids
                                .split(',')
                                .map(parseInt),
                            category_ids
                        ).length
                )
            }
            return data
        })
        .catch(err => {
            console.log(err)
        })

    },
    
    getPostsLikeCounts: async (ids) =>
        await db.select('COUNT(author_id) as likes', 'post_id')
            .from('blog_post_likes')
            .groupBy('post_id')
            .whereIn('post_id', ids)
            .catch(errorHandler),

    getPostComments: async (id) => 
        await db.select('*')
            .from('blog_post_comments')
            .where('post_id', id)
            .catch(errorHandler),

    getPostsAuthors: async (ids) =>
        await db.select('*')
            .from('users')
            .where('id', ids)
            .catch(errorHandler)
}