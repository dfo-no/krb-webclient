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

    cy.get('label')
      .contains('Last opp besvarelser')
      .selectFile(
        './cypress/filesForUploadTesting/2022-10-03-citronen-response-4.pdf'
      );
    cy.contains('Citronen');
    cy.contains('2022-10-03-citronen-response-4.pdf');

    cy.contains('Manuell evaluering').click();

    cy.contains('Evaluer besvarelser').click();

    cy.contains('Citronen');

    cy.intercept(
      'POST',
      'https://krb-api-man-dev.azure-api.net/java/generateResponse'
    ).as('generateEvaluation');
    cy.contains('Last ned evaluering').click();
    cy.wait('@generateEvaluation').then((interception) => {
      expect(interception.response.statusCode).gte(200).lt(300);
      // console.log(interception)
      expect(interception.response.body.byteLength).gt(6500);
    });
  });

  it('fallback works when no specification is uploaded or found', () => {
    cy.visit('localhost:3000/evaluation/not-an-uuid');

    cy.contains('Velg kravsettet du vil bruke i evalueringen');
    cy.contains('Last opp spesifikasjon');
    cy.contains('Last opp besvarelser');
    cy.contains('Manuell evaluering');
    cy.contains('Resultat');

    cy.contains('Last opp et kravsett').selectFile(
      './cypress/filesForUploadTesting/2022-09-30_specification-4.pdf'
    );
    cy.wait(1000);

    cy.get('label')
      .contains('Last opp besvarelser')
      .selectFile(
        './cypress/filesForUploadTesting/2022-10-03-citronen-response-4.pdf'
      );
    cy.wait(500);

    cy.contains('Manuell evaluering').click();

    cy.contains('Evaluer besvarelser').click();

    cy.intercept(
      'POST',
      'https://krb-api-man-dev.azure-api.net/java/generateResponse'
    ).as('generateEvaluation');
    cy.contains('Last ned evaluering').click();
    cy.wait('@generateEvaluation').then((interception) => {
      expect(interception.response.statusCode).gte(200).lt(300);
      // console.log(interception)
      expect(interception.response.body.byteLength).gt(6500);
    });
  });
});
