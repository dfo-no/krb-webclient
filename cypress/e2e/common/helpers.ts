const bankIntercept = () => {
  cy.intercept(
    'Get',
    `https://krb-api-man-dev.azure-api.net/api/bank/banks?pageSize=500&page=1&fieldName=title&order=DESC`
  ).as('getBanks');
};

const waitForBanks = () => {
  cy.wait('@getBanks').its('response.statusCode').should('eq', 200);
};

const visitHomePageAndWaitBank = () => {
  bankIntercept();
  cy.visit('localhost:3000');
  waitForBanks();
};

const downloadIntercept = (path: string, alias = 'generatePDF') => {
  cy.intercept('POST', `https://krb-api-man-dev.azure-api.net/java/${path}`).as(
    alias
  );
};

const downloadWait = (alias: string) => {
  cy.wait(alias).its('response.statusCode').should('eq', 200);
};

const clickAndWaitForResponse = (
  element: Cypress.Chainable<JQuery<HTMLDivElement>>,
  path: string
) => {
  downloadIntercept(path);
  element.click();
  downloadWait('@generatePDF');
};

const uploadFile = (fileName: string) => {
  cy.visit('localhost:3000');
  cy.contains('Last opp kravbank-fil').selectFile(fileName);
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(500);
};

const uploadResponseFileForEvaluation = (fileName: string) => {
  cy.get('[data-cy="file-upload"]')
    .get('input[type="file"]')
    .selectFile(fileName);
};

export {
  visitHomePageAndWaitBank,
  clickAndWaitForResponse,
  uploadFile,
  uploadResponseFileForEvaluation,
};
