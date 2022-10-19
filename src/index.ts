import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { readFileSync } from 'fs'
import NbaAPI from './datasources/nba'
import resolvers from './resolvers/index'

export interface Context {
  dataSources: {
    api: NbaAPI
  }
}

const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' })

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 3000 },
  context: async () => {
    return {
      dataSources: {
        api: new NbaAPI(),
      },
    }
  },
})

console.log(`Server ready at: ${url}`)
