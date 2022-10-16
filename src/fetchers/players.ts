import { httpGet, json } from '../fetchers/utils'

type FetchedPlayer = {
  teamId: string
  personId: string
  firstName: string
  lastName: string
  jersey: string
}

type Response = {
  league: {
    standard: FetchedPlayer[]
  }
}

const fetchPlayers = async () => {
  try {
    const message = await httpGet(
      'http://data.nba.net/data/10s/prod/v1/2022/players.json'
    )
    const response = await json<Response>(message)
    return response?.league?.standard ?? []
  } catch (e) {
    throw e
  }
}

export { FetchedPlayer }
export default fetchPlayers
