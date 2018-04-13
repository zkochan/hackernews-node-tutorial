const { Prisma } = require('prisma-binding')
const { GraphQLServer } = require('graphql-yoga')

// 2
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (root, args, context, info) => {
      return context.db.query.links({}, info)
    },
    link: (root, args) => links.find((link) => link.id === args.id),
  },
  Mutation: {
    post: (root, args, context, info) => {
      return context.db.mutation.createLink({
        data: {
          url: args.url,
          description: args.description,
        },
      }, info)
    },
    updateLink: (root, args) => {
      const link = links.find((link) => link.id === args.id)
      if (typeof args.url === 'string') {
        link.url = args.url
      }
      if (typeof args.description === 'string') {
        link.description = args.description
      }
      return link
    },
    deleteLink: (root, args) => {
      const linkIndex = links.findIndex((link) => link.id === args.id)
      const link = links[linkIndex]
      links.splice(linkIndex, linkIndex + 1)
      return link
    },
  },
}

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => Object.assign({},
    req, {
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://eu1.prisma.sh/public-rowanfright-30/hackernews-node/dev',
      secret: 'mysecret123',
      debug: true,
    }),
  }),
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
