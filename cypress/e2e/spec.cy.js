describe('burrito time', () => {

  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {fixture: 'orders'} )
    cy.intercept('GET', 'http://localhost:3001/api/v1/foo', {fixture: 'error'})
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
      statusCode: 201,
      body: {
        name: 'Cole Stephenson',
        ingredients: ['beans', 'steak']
      }
    })

    cy.visit('http://localhost:3000/')
  })

  it('displays the Title', () => {
    cy.contains('Burrito Builder')
  })

  it('populates the home page with 3 orders and a line that updates them on what the current order is before submitting', () => {
    cy.get('.order').should('have.length', 3)
    .first().contains('Pat')

    cy.get('.order-update').should('be.visible')

    cy.get('.order').last().contains('Alex')
  })

  it('should be able to submit an order and see the order rendered on the page', () => {
    cy.get('input[name="name"]').click().type('Cole Stephenson')
    .get('button[name="beans"]').click()
    .get('button[name="steak"]').click()
    .get('button[name="submit"]').click()
    .get('.order').should('have.length', 4)
    .get('.order').last().contains('Cole Stephenson')
  })

  it('should not be able to submit an order if the name is not filled out', () => {
    cy.get('button[name="beans"]').click()
    .get('button[name="steak"]').click()
    .get('button[name="submit"]').click()
    .get('.order').should('have.length', 3)
    .get('.order').last().contains('Alex')
  })

  it('should not be able to submit an order if ingredients have not been selected', () => {
      cy.get('input[name="name"]').click().type('Cole Stephenson')
      .get('button[name="submit"]').click()
      .get('.order').should('have.length', 3)
      .get('.order').last().contains('Alex')
  })

})
