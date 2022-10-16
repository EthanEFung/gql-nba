import { Resolvers } from '../__generated__/typescript-resolvers'
import teams from './teams'
import players from './players'

const resolvers: Resolvers = {
  Query: {
    teams,
    players,
  },
}

export default resolvers
