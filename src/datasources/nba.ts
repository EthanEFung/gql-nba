import { RESTDataSource } from '@apollo/datasource-rest'

type FetchedPlayer = {
  teamId: string
  personId: string
  firstName: string
  lastName: string
  jersey: string
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
}

export default NbaAPI
