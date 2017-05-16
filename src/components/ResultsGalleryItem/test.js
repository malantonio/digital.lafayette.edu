import React from 'react'
import { shallow } from 'enzyme'
import GalleryItem from './'

const defaultProps = {
  thumbnail_path: 'http://example.org/cool.jpg',
}

const wrapEl = xtend => shallow(<GalleryItem {...defaultProps} {...xtend} />)

const SELECTORS = {
  title: '.ResultGalleryItem-title'
}

describe('<ResultsGalleryItem />', () => {
  describe(`the ${SELECTORS.title} label`, () => {
    it('renders the first entry if `props.title` is an array', () => {
      const title = ['cool cats', 'rad dogs']
      const $el = wrapEl({title})

      expect($el.find(SELECTORS.title).text()).toEqual(title[0])
    })

    it('renders the prop if `props.title` is a string', () => {
      const title = 'look at this title!'
      const $el = wrapEl({title})

      expect($el.find(SELECTORS.title).text()).toEqual(title)
    })

    it('falls back to the `id` if the title doesn\'t work', () => {
      const id = 'abc1234'
      const $el = wrapEl({id})

      expect($el.find(SELECTORS.title).text()).toEqual(id)
    })
  })
})
