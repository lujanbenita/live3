/* eslint-disable */
/// <reference types="cypress" />

describe("The user", () => {
  beforeEach(() => {
    cy.setupStorageAndCookies();
    cy.visit(`${Cypress.env("host")}/my-account/my-settings`);
  });

  afterEach(() => {
    cy.get(".c-error__page").should("not.exist");
  });

  it("logs out", () => {
    cy.intercept("GET", /services\/logout/, {
      statusCode: 200,
    }).as("live2Logout");

    cy.get(".c-navbar__avatar-container").click({ force: true });
    cy.contains("Logout").click({ force: true });
    cy.url().should("include", "/login");
  });
});
