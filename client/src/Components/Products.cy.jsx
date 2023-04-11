import React from 'react'
import Products from './UserProducts/Products'

describe('<Products />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Products />)
  })
})