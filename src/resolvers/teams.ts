import fetchTeams, { FetchedTeam } from '../fetchers/teams'
import fetchPlayers, { FetchedPlayer } from '../fetchers/players'
import { Team } from '../__generated__/typescript-resolvers'
import { player } from './players'

const team = ({
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

const associate = (players: FetchedPlayer[]) => {
  return (team: Team): Team => {
    return {
      ...team,
      players: players.filter((player) => player.teamId == team.id).map(player),
    }
  }
}

const teams = async () => {
  return (await fetchTeams()).map(team).map(associate(await fetchPlayers()))
}

export { team }
export default teams
