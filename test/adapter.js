import duxy from 'duxy'
import nock from 'nock'
import superagent from 'superagent'
import { expect } from 'chai'

import createAdapter from '../src'

describe('duxy-superagent', () => {
  const http = createAdapter(superagent)((_, client) => client.accept('json'))

  const client = duxy({ http }, ({ namespace, resource }) => {
    namespace('api', { path: 'api' }, () => {
      resource('posts')
    })
  })

  it('can preform read requests', () => {
    nock('http://localhost')
      .get('/api/posts/')
      .query({ query: 'yes' })
      .matchHeader('accept', 'application/json')
      .reply(200, JSON.stringify({ ok: true }), { 'Content-Type': 'application/json' })

    return client.api.posts.findAll({ query: 'yes' }).then((res) => {
      expect(res.body).to.deep.equal({ ok: true })
    })
  })

  it('can preform write requests', () => {
    nock('http://localhost')
      .post('/api/posts/', { body: 'yes' })
      .query({ query: 'yes' })
      .matchHeader('accept', 'application/json')
      .reply(200, JSON.stringify({ ok: true }), { 'Content-Type': 'application/json' })

    return client.api.posts.create({ body: 'yes' }, { query: 'yes' }).then((res) => {
      expect(res.body).to.deep.equal({ ok: true })
    })
  })
})
