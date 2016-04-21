import { Promise } from 'es6-promise'

export default function createAdapter (adapter) {
  return use => req => {
    const superagent = adapter(req.method, req.url)

    if (req.query) superagent.query(req.query)
    if (req.body) superagent.send(req.body)

    use(req, superagent)

    return new Promise((resolve, reject) => {
      superagent.end((err, res) => {
        if (err) return reject(err)
        resolve(res)
      })
    })
  }
}
