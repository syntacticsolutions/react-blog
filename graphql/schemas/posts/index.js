const fs = require('fs')
const path = require('path')
const PostService = require('../../api/posts')
const {errorHandler} = require('../../api/utils')

const getPostsWithAuthors = cb => 
    async (parent, args, context, info) => {
        const posts = await cb(args, parent)
            .catch(errorHandler)

        if (!posts.length) return []

        const authors = await PostService.getPostsAuthors(
            [...new Set(posts.map(({author_id}) => author_id))]
        )
        .catch(errorHandler)


        const authorMap = authors.reduce((map, author) => ({
            ...map,
            [author.id]: `${author.first_name} ${author.last_name}`
        }), {})

        return posts.map(({categories, author_id, ...rest}, index) => 
            ({
                categories: categories.split(','),
                ...rest,
                author: authorMap[author_id]
            })

        )
    }

module.exports = {
    resolvers: {
        Query: {
            getPostsByType: getPostsWithAuthors(
                async ({type}) => await PostService.getPosts(type)
            ),
            getPostsByCategories: getPostsWithAuthors(
                async ({cat_ids}) => await PostService.getPosts('default', cat_ids)
            ),
            getPost: async (parent, args) => PostService.getPost(args.id)
        },
        Mutation: {
            createPost: async (parent, args) => PostService.createPost(args)
        }
    },
    schema: fs.readFileSync(
        path.resolve(
            __dirname,
            './posts-schema.graphql'
        )
    ).toString()
}
