import http from 'http'

const httpGet = (url: string): Promise<http.IncomingMessage> => {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      if (res.statusCode >= 400) {
        reject(res)
      }
      resolve(res)
    })
  })
}

const json = <T>(message: http.IncomingMessage): Promise<T> => {
  return new Promise((resolve, reject) => {
    let body = ''
    message.on('data', (chunk) => {
      body += chunk
    })
    message.on('end', () => {
      try {
        const value = JSON.parse(body)
        resolve(value)
      } catch (e) {
        reject(e)
      }
    })
  })
}

export { httpGet, json }
