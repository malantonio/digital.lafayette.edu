import React from 'react'
import { expect } from 'chai'
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

describe('components/Breadcrumb', function () {
  describe(`the ${SELECTORS.facet} label`, function () {
    it('renders `facet.label` when present', function () {
      const $el = wrapEl()
      const $facet = $el.find(SELECTORS.facet)
      expect($facet).to.have.lengthOf(1)
      expect($facet.text()).to.contain(defaultProps.facet.label)
      expect($facet.text()).to.contain('>')
    })

    it('does not render when `.label` is missing', function () {
      const facet = {name: 'cool-facet'}
      const $el = wrapEl({facet})
      const $facet = $el.find(SELECTORS.facet)

      expect($facet).to.have.lengthOf(0)
    })

    it('does not render `facet` is not present', function () {
      const $el = wrapEl({facet: undefined})
      expect($el.find(SELECTORS.facet)).to.have.lengthOf(0)
    })
  })

  describe(`the ${SELECTORS.button} button`, function () {
    it('triggers `onRemove` when clicked', function (done) {
      const onRemove = (facet, item) => {
        expect(facet).to.deep.equal(defaultProps.facet)
        expect(item).to.deep.equal(defaultProps.item)

        done()
      }

      const $el = wrapEl({onRemove})
      const $btn = $el.find(SELECTORS.button)
      $btn.simulate('click')
    })

    it('toggles "hovered" mode for the component using mouseOver/mouseOut', function () {
      const hovered = 'buttonHover'
      const $el = wrapEl()

      expect($el.find(SELECTORS.hover)).to.have.lengthOf(0)
      expect($el.state(hovered)).to.be.false

      const $btn = $el.find(SELECTORS.button)
      $btn.simulate('mouseOver')

      expect($el.find(SELECTORS.hover)).to.have.lengthOf(1)
      expect($el.state(hovered)).to.be.true

      $btn.simulate('mouseOut')

      expect($el.find(SELECTORS.hover)).to.have.lengthOf(0)
      expect($el.state(hovered)).to.be.false
    })
  })
})
