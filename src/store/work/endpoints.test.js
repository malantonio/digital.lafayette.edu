import { expect } from 'chai'
import fetchMock from 'fetch-mock'
import * as endpoints from './endpoints'

describe('store/work/endpoints', function () {
  describe('#getWorkById', function () {
    before(function () {
      fetchMock.get('*', '{}')
    })

    it('contains the SEARCH_PATH', function () {
      return endpoints.getWorkById('123').then(() => {
        expect(fetchMock.lastUrl()).to.contain(endpoints.SEARCH_PATH)
      })
    })

    it('appends the id to the url', function () {
      const id = 'abc123'
      return endpoints.getWorkById(id).then(() => {
        expect(fetchMock.lastUrl()).to.contain(id)
      })
    })
  })
})
