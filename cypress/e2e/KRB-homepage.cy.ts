describe('check front page', () => {
  it('has multiple banks on the front page', () => {
    cy.visit('localhost:3000')
    // Can break if not testet for a long time since for dates more than a
    // certain number of days above will display as an actual date instead as a
    // relative number compared to today
    cy.get('li:contains(dager siden)').its('length').should('be.at.least', 5)
  })

  it('has a working search field', () => {
    cy.visit('localhost:3000')
    cy.contains('Søk etter').parent().click().type('test')
    cy.contains('Raghad test project')
    cy.contains('Kriterieveiviseren TestProsjekt')
    cy.contains('Erik sitt testprosjekt')
  })

  it('can select a bank from a search field and create new specification', () => {
    cy.visit('localhost:3000')
    cy.contains('Søk etter').parent().click().type('test')
    cy.contains('Kriterieveiviseren TestProsjekt').click()
    cy.contains('Test av Nye møbler')
    cy.contains('Opprett kravspesifikasjon').click()
    cy.get('input[placeholder=\"Navn på spesifikasjon\"]').type('Nye møbler 2022-10')
    cy.get('input[placeholder=\"Navn\"]').type('Horten kommune')
    cy.get('input[placeholder=\"Organisasjonsnummer\"]').type('964951284')
    cy.contains('Opprett kravspesifikasjon').click()
    cy.url().should('include', 'http://localhost:3000/specification/')
    cy.contains('Nye møbler 2022-10')
    cy.contains('Lag et nytt produkt')
    cy.contains('Last ned spesifikasjon')

  })
})