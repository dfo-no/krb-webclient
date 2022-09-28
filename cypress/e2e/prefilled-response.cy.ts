describe('create prefilled response', () => {

  it('has a working search field', () => {
    cy.visit('localhost:3000')
    cy.contains('Søk etter').parent().click().type('Kjøretøy til hjemmetjenesten')
    cy.contains('Kjøretøy til hjemmetjenesten').click()
    cy.contains('Kjøretøy til hjemmetjenesten')

    // Her starter "Lag forberedt besvarelse"
    cy.contains('Lag forberedt besvarelse').click()
    cy.get('input[placeholder="Navn på leverandør"]').type('leverandør e77f5faf-9b3f-49ba-b216-d9951c11ab11')
    cy.contains('Lag forberedt besvarelse').click()
    cy.url().should('include', 'http://localhost:3000/prefilledresponse/')
    cy.contains('Kjøretøy til hjemmetjenesten')
    cy.contains('Last ned forberedt besvarelse')

    // Her legger vi til et nytt produkt og sjekker at alt ser riktig ut
    cy.contains('Lag et nytt produkt').click()
    cy.get('input[placeholder="Navn på produkt"]').type('bil 5783d780-d4a4-49aa-90e9-1b2f3ef86da3')
    cy.get('input[placeholder="Beskrivelse av produktet"]').type('enkel elbil')
    cy.contains('Krav du finner under Bil')
    cy.contains('Kjøreegenskaper')
    cy.contains('Inventar')
    cy.contains('Bagasjerom')
    cy.contains('Sikring')
    cy.contains('Utseende')

    // Her endrer vi produkttype til El-bil og ser at beskrivelsen av krav endrer seg
    cy.contains('El-bil').click()
    cy.should('not.contain', 'Krav du finner under Bil')
    cy.contains('Krav du finner under El-bil')
    cy.should('not.contain', 'Kjøreegenskaper')
    cy.contains('Inventar')
    cy.contains('Bagasjerom')
    cy.contains('Sikring')
    cy.contains('Utseende')

    // Her lagrer vi det nye produktet
    cy.get('button').contains('Lagre').click()

    // Her setter vi og lagrer informasjon om de to første kravene
    cy.contains('Tilbehør i kupé').parent().contains('Ikke besvart').click()
    cy.contains('Tilbehør i kupé').parent().contains('Lagre').click()
    cy.contains('Tilbehør i kupé').parent().should('not.contain', 'Ikke besvart').click()
    cy.contains('Seter foran').parent().contains('Ikke besvart').click()
    cy.contains('Seter foran').parent().contains('Input').click()
    cy.contains('Seter foran').parent().get('input[type=number]').type('{selectAll}2')
    cy.contains('Seter foran').parent().contains('Lagre').click()
    cy.contains('Seter foran').parent().should('not.contain', 'Ikke besvart').click()
    cy.contains('Seter foran').parent().contains('Svar: 2 sete(r)')

  })

})