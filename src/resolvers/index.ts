import { Resolvers, Team, Player } from '../__generated__/typescript-resolvers'
import { FetchedTeam, FetchedPlayer } from '../datasources/nba'
import { Context } from '../index'

const resolvers: Resolvers<Context> = {
  Query: {
    async teams(_, __, { dataSources }) {
      const normalize = ({
        confName,
        divName,
        teamShortName,
        teamId,
        ...rest
      }: FetchedTeam): Team => ({
        __typename: 'Team',
        id: teamId,
        conference: confName,
        division: divName,
        shortName: teamShortName,
        players: [],
        ...rest,
      })

      return (await dataSources.api.teams()).map(normalize)
    },
    async players(_, __, { dataSources }) {
      const normalize = ({
        teamId,
        personId,
        ...rest
      }: FetchedPlayer): Player => ({
        __typename: 'Player',
        id: personId,
        ...rest,
      })

      return (await dataSources.api.players()).map(normalize)
    },
  },
  Player: {
    async team(parent, args, { dataSources }) {
      const normalize = ({
        confName,
        divName,
        teamShortName,
        teamId,
        ...rest
      }: FetchedTeam): Team => ({
        __typename: 'Team',
        id: teamId,
        conference: confName,
        division: divName,
        shortName: teamShortName,
        players: [],
        ...rest,
      })
      const teams = await dataSources.api.teams()
      const player = (await dataSources.api.players()).find(
        (fp) => parent.id === fp.personId
      )

      return normalize(teams.find((ft) => ft.teamId === player.teamId))
    },
  },
  Team: {
    async players(parent, _, { dataSources }) {
      const normalize = ({
        teamId,
        personId,
        ...rest
      }: FetchedPlayer): Player => ({
        __typename: 'Player',
        id: personId,
        ...rest,
      })
      const players = await dataSources.api.players()

      return players.filter((fp) => fp.teamId == parent.id).map(normalize)
    },
  },
}

export default resolvers
