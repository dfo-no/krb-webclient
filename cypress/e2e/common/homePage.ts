import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { uploadFile, visitHomePageAndWaitBank } from './helpers';

Given('Jeg åpner hjemmesiden', () => {
  visitHomePageAndWaitBank();
});

Then('Ser jeg minimum {int} banker i siden', (value: number) => {
  cy.get('[data-cy="newest-banks-container"]')
    .get('[data-cy="bank"]')
    .its('length')
    .should('be.at.least', value);
});

When('Laste opp kravspesifikasjon {string}', (specificationName: string) => {
  uploadFile(`./cypress/filesForUploadTesting/${specificationName}`);
});

When('Laste opp forberedt besvarelse', () => {
  uploadFile(
    './cypress/filesForUploadTesting/prefilledesponse-Kriterieveiviseren TestProsjekt.pdf'
  );
});

When('Laste opp besvarelse', () => {
  uploadFile(
    './cypress/filesForUploadTesting/2022-11-30-citronen-response-5.pdf'
  );
});
