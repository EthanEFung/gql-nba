import { httpGet, json } from './utils'
import { Conference, Division } from '../__generated__/typescript-resolvers'

type FetchedTeam = {
  isNBAFranchise: boolean
  fullName: string
  tricode: string
  teamShortName: string
  teamId: string
  urlName: string
  confName: Conference
  divName: Division
}

type Response = {
  league: {
    standard: FetchedTeam[]
  }
}

const nbaFranchise = (team: FetchedTeam): boolean => team.isNBAFranchise

const fetchTeams = async () => {
  try {
    const message = await httpGet(
      'http://data.nba.net/data/10s/prod/v2/2022/teams.json'
    )
    const response = await json<Response>(message)
    return (response?.league?.standard ?? []).filter(nbaFranchise)
  } catch (e) {
    throw e
  }
}

export { FetchedTeam }
export default fetchTeams
