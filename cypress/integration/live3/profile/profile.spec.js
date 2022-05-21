/* eslint-disable */
/// <reference types="cypress" />

describe("The users settings page", () => {
  beforeEach(() => {
    cy.setupStorageAndCookies();
    cy.visit(`${Cypress.env("host")}/my-account/my-settings`);
  });

  afterEach(() => {
    cy.get(".c-error__page").should("not.exist");
  });

  it("loads the user data", () => {
    cy.contains("h2.c-my-settings__title", "My personal Data");
  });
});
