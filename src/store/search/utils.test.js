import { expect } from 'chai'
import * as utils from './utils'

describe('store/search/utils', function () {
  describe('#flattenValues', function () {
    it('flattens an array of objects', function () {
      const input = {
        facets: [
          { value: 'cats' },
          { value: 'dogs' },
          { value: 'ice cream' },
        ]
      }

      const expected = {
        facets: ['cats', 'dogs', 'ice cream']
      }

      expect(utils.flattenValues(input)).to.deep.equal(expected)
    })

    it('sets the first value if `isRange` is true', function () {
      const input = {
        range: [{
          label: 'cool range',
          value: {
            begin: '1990',
            end: '1999'
          }
        }]
      }

      const expected = {
        range: {
          begin: '1990',
          end: '1999'
        }
      }

      expect(utils.flattenValues(input, true)).to.deep.equal(expected)
    })

    it('flattens objects with `value` attributes', function () {
      const input = {
        thing: {
          value: 'is cool'
        }
      }

      const expected = {
        thing: 'is cool'
      }

      expect(utils.flattenValues(input)).to.deep.equal(expected)
    })

    it('passes the value otherwise', function () {
      const input = {
        query: 'cool cats'
      }

      expect(utils.flattenValues(input)).to.deep.equal(input)
    })
  })
})
