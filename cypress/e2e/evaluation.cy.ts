describe('evaluation', () => {
  it('can upload specification', () => {
    cy.visit('localhost:3000');
    cy.contains('Last opp kravbank-fil').selectFile(
      './cypress/filesForUploadTesting/2022-09-30_specification-4.pdf'
    );
    cy.contains('Rediger spesifikasjon');
    cy.contains('Lag Besvarelse');
    cy.contains('Lag forberedt besvarelse');
    cy.contains('Gjennomfør evaluering');

    cy.contains('Gjennomfør evaluering').click();

    cy.contains('Besvarelser må være basert på gjeldende kravsett');
    cy.contains('Last opp spesifikasjon');
    cy.contains('Last opp besvarelser');
    cy.contains('Manuell evaluering');
    cy.contains('Resultat');
  });

  it('fallback works when no specification is uploaded or found', () => {
    cy.visit('localhost:3000/evaluation/not-an-uuid');

    cy.contains('Velg kravsettet du vil bruke i evalueringen');
    cy.contains('Last opp spesifikasjon');
    cy.contains('Last opp besvarelser');
    cy.contains('Manuell evaluering');
    cy.contains('Resultat');
  });
});
