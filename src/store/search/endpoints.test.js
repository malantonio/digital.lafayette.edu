import { expect } from 'chai'
import fetchMock from 'fetch-mock'
import * as endpoints from './endpoints'

describe('store/search/endpoints', function () {
  describe('#search', function () {
    const search = {
      query: 'cats',
      facets: {
        subject: [{value: 'animals'}]
      },
      range: {
        date: [{
          value: {
            begin: '1990',
            end: '1999',
          }
        }]
      },
      meta: {
        page: 3,
      }
    }

    const shortQs = ''
      + '?q=cats'
      + '&f[subject][]=animals'
      + '&range[date][begin]=1990'
      + '&range[date][end]=1999'

    it('stringifies the values + opts to call the API', function () {
      const url = process.env.API_BASE_URL
        + endpoints.SEARCH_PATH
        + shortQs
        + '&page=3'
        + `&per_page=${endpoints.PER_PAGE_LIMIT}`

      return endpoints.search(search)
        .then(() => {
          expect(decodeURIComponent(fetchMock.lastUrl()))
            .to.equal(url)
        })
    })

    it('sets the window url to an abbreviated search-related url', function () {
      return endpoints.search(search)
        .then(() => {
          expect(window.location.pathname).to.equal('/search')
          expect(decodeURIComponent(window.location.search))
            .to.equal(shortQs)
        })
    })
  })
})
