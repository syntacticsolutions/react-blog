const postsSchema = require('./posts')

const resolvers = [
    postsSchema.resolvers
]

const typeDefs = [
    postsSchema.schema
]

module.exports = {
    resolvers,
    typeDefs
}