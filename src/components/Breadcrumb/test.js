import React from 'react'
import { shallow } from 'enzyme'
import Breadcrumb from './'

const defaultProps = {
  facet: {
    name: 'cool-facet',
    label: 'Cool Facet'
  },

  item: {
    label: 'Cool Facet - Label',
    value: 'Cool Facet - Value'
  }
}

const wrapEl = xtend => shallow(<Breadcrumb {...defaultProps} {...xtend} />)

const SELECTORS = {
  facet: '.Breadcrumb-facet',
  item: '.Breadcrumb-item',
  button: '.Breadcrumb-remove-btn',
  hover: '.is-hovered',
}

describe('components/Breadcrumb', () => {
  describe(`the ${SELECTORS.facet} label`, () => {
    test('renders `facet.label` when present', () => {
      const $el = wrapEl()
      const $facet = $el.find(SELECTORS.facet)
      expect($facet).toHaveLength(1)
      expect($facet.text()).toContain(defaultProps.facet.label)
      expect($facet.text()).toContain('>')
    })

    test('does not render when `.label` is missing', () => {
      const facet = {name: 'cool-facet'}
      const $el = wrapEl({facet})
      const $facet = $el.find(SELECTORS.facet)

      expect($facet).toHaveLength(0)
    })

    test('does not render `facet` is not present', () => {
      const $el = wrapEl({facet: undefined})
      expect($el.find(SELECTORS.facet)).toHaveLength(0)
    })
  })

  describe(`the ${SELECTORS.button} button`, () => {
    test('triggers `onRemove` when clicked', done => {
      const onRemove = (facet, item) => {
        expect(facet).toEqual(defaultProps.facet)
        expect(item).toEqual(defaultProps.item)

        done()
      }

      const $el = wrapEl({onRemove})
      const $btn = $el.find(SELECTORS.button)
      $btn.simulate('click')
    })

    test('toggles "hovered" mode for the component using mouseOver/mouseOut', () => {
      const hovered = 'buttonHover'
      const $el = wrapEl()

      expect($el.find(SELECTORS.hover)).toHaveLength(0)
      expect($el.state(hovered)).toBeFalsy()

      const $btn = $el.find(SELECTORS.button)
      $btn.simulate('mouseOver')

      expect($el.find(SELECTORS.hover)).toHaveLength(1)
      expect($el.state(hovered)).toBeTruthy()

      $btn.simulate('mouseOut')

      expect($el.find(SELECTORS.hover)).toHaveLength(0)
      expect($el.state(hovered)).toBeFalsy()
    })
  })
})
