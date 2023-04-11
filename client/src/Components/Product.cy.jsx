import React from 'react'
import Product from './Product'

describe('<Product />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Product />)
  })
})