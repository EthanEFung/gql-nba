import { Player } from '../__generated__/typescript-resolvers'
import fetchPlayers, { FetchedPlayer } from '../fetchers/players'
import fetchTeams, { FetchedTeam } from '../fetchers/teams'
import { team } from './teams'

const player = ({ teamId, personId, ...rest }: FetchedPlayer): Player => ({
  __typename: 'Player',
  id: personId,
  ...rest,
})

const associate = (fetchedTeams: FetchedTeam[]) => {
  const map = new Map(fetchedTeams.map((ft) => [ft.teamId, team(ft)]))
  return (fetchedPlayer: FetchedPlayer) => ({
    ...fetchedPlayer,
    team: map.get(fetchedPlayer.teamId) ?? null,
  })
}

const players = async (_, __, { dataSources }) => {
  return (await dataSources.api.players())
    .map(associate(await fetchTeams()))
    .map(player)
}

export { player }
export default players
