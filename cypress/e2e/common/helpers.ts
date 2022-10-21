const intercept = (path: string, alias = 'generatePDF') => {
  cy.intercept(
    'POST',
    `https://krb-api-man-dev.azure-api.net/java/${path}`
  ).as(alias);
};

const wait = (alias: string) => {
  cy.wait(alias).its('response.statusCode').should('eq', 200);
};

const clickAndWaitForResponse = (element: Cypress.Chainable<JQuery<HTMLDivElement>>, path: string) => {
  intercept(path);
  element.click();
  wait('@generatePDF');
};

export { clickAndWaitForResponse };
