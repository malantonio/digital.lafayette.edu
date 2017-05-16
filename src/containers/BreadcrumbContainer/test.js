import React from 'react'
import { shallow } from 'enzyme'
import BreadcrumbContainer from './'

const wrapEl = xtend => shallow(<BreadcrumbContainer {...xtend} />)

describe('<BreadcrumbContainer />', () => {
  it('renders no children when nothing is passed', () => {
    const $el = wrapEl()
    expect($el.find('.BreadcrumbContainer').children()).toHaveLength(0)
  })

  it('renders a Breadcrumb when the query is not empty', () => {
    const query = 'cool query'
    const $el = wrapEl({query})
    const $query = $el.findWhere($e => $e.key() === 'bc-query')

    expect($query).toHaveLength(1)
    expect($query.prop('item')).toEqual({value: query})
  })

  it('renders a Breadcrumb for each facet-item', () => {
    const facets = {
      subject: [
        {value: 'cool-subject-1', label: 'Cool Subject 1'},
        {value: 'cool-subject-2', label: 'Cool Subject 2'}
      ],
      author: [
        {value: 'cool-author-1', label: 'Cool Author 1'},
      ]
    }

    const total = Object.keys(facets).reduce((count, key) => {
      count += facets[key].length
      return count
    }, 0)

    const $el = wrapEl({facets})
    expect($el.find('Breadcrumb')).toHaveLength(total)
  })

  it('renders a Breadcrumb for each range', () => {
    const range = {
      date_created: {
        begin: '1900',
        end: '1999',
      },
      author_birth_date: {
        begin: '1986',
        end: '1991',
      }
    }

    const total = Object.keys(range).length

    const $el = wrapEl({range})
    expect($el.find('Breadcrumb')).toHaveLength(total)
  })

  it('uses a dictionary to obtain the label for the facet', () => {
    const dictionary = {
      subject: {
        label: 'Cool Subject',
      },
      date_created: 'Date Created'
    }

    const facets = {
      subject: [
        {value: 'cool value'}
      ],
      date_created: [
        {value: '1990'},
      ],
      author: [
        {value: 'Cool Author'}
      ]
    }

    const $el = wrapEl({dictionary, facets})
    const $breadcrumbs = $el.find('Breadcrumb')

    const $sub = $breadcrumbs.findWhere($b => $b.key() === 'bc-subject-0')
    const $dc = $breadcrumbs.findWhere($b => $b.key() === 'bc-date_created-0')
    const $auth = $breadcrumbs.findWhere($b => $b.key() === 'bc-author-0')

    expect($sub.prop('facet').label).toEqual(dictionary.subject.label)
    expect($dc.prop('facet').label).toEqual(dictionary.date_created)
    expect($auth.prop('facet').label).toEqual('author')
  })
})
