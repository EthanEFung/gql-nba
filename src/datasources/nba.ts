import { RESTDataSource } from '@apollo/datasource-rest'
import { Conference, Division } from '../__generated__/typescript-resolvers'

export type FetchedPlayer = {
  teamId: string
  personId: string
  firstName: string
  lastName: string
  jersey: string
}

export type FetchedTeam = {
  isNBAFranchise: boolean
  fullName: string
  tricode: string
  teamShortName: string
  teamId: string
  urlName: string
  confName: Conference
  divName: Division
}

class NbaAPI extends RESTDataSource {
  override baseURL = 'http://data.nba.net/data/10s/prod/'

  async players(): Promise<FetchedPlayer[]> {
    type Response = {
      league: {
        standard: FetchedPlayer[]
      }
    }

    const data = await this.get<Response>('v1/2022/players.json')

    return data?.league?.standard ?? []
  }

  async teams(): Promise<FetchedTeam[]> {
    type Response = {
      league: {
        standard: FetchedTeam[]
      }
    }

    const nbaFranchise = (team: FetchedTeam): boolean => team.isNBAFranchise

    const data = await this.get<Response>('v2/2022/teams.json')

    return (data?.league?.standard ?? []).filter(nbaFranchise)
  }
}

export default NbaAPI
