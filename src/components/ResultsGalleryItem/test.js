import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import GalleryItem from './'

const defaultProps = {
  thumbnail_path: 'http://example.org/cool.jpg',
}

const wrapEl = xtend => shallow(<GalleryItem {...defaultProps} {...xtend} />)

const SELECTORS = {
  title: '.ResultsGalleryItem-title'
}

describe('<ResultsGalleryItem />', function () {
  describe(`the ${SELECTORS.title} label`, function () {
    it('renders the first entry if `props.title` is an array', function () {
      const title = ['cool cats', 'rad dogs']
      const $el = wrapEl({title})

      expect($el.find(SELECTORS.title).text()).to.equal(title[0])
    })

    it('renders the prop if `props.title` is a string', function () {
      const title = 'look at this title!'
      const $el = wrapEl({title})

      expect($el.find(SELECTORS.title).text()).to.equal(title)
    })

    it('falls back to the `id` if the title doesn\'t work', function () {
      const id = 'abc1234'
      const $el = wrapEl({id})

      expect($el.find(SELECTORS.title).text()).to.equal(id)
    })
  })
})
