/* eslint-disable */
/// <reference types="cypress" />

describe("The 'NLA Credentials' form", () => {
  beforeEach(() => {
    cy.setupStorageAndCookies();
    cy.visit(`${Cypress.env("host")}/my-account/my-settings`);
  });

  it("change NLA with success", () => {
    cy.contains("NLA Credentials").click();
    cy.get('[name="NLAPassword"]').type("*");

    cy.intercept("PATCH", "api/users/648/nla-credential", {
      statusCode: 200,
      fixture: "/patch/NLACredentialsChange.json",
    }).as("NLACredentialsChange");

    cy.contains("Save Credentials").click();
    cy.wait("@NLACredentialsChange");
    cy.get(".c-toast__message").should("contain", "NLA Credentials updated.");
    cy.get(".c-modal__container").should("not.exist");
  });

  // TODO: change NLA credentials ( error) //
  it("change NLA with error", () => {
    cy.contains("NLA Credentials").click();
    cy.get('[name="NLAPassword"]').type("*");

    cy.intercept("PATCH", "api/users/648/nla-credential", {
      statusCode: 500,
      fixture: "/patch/NLACredentialsChange.json",
    }).as("NLACredentialsChange");

    cy.contains("Save Credentials").click();
    cy.wait("@NLACredentialsChange");
    cy.get(".c-toast__message").should("not.exist");

    cy.contains("NLA Credentials").click();
    cy.get('[name="NLAPassword"]').type("*");

    cy.intercept("PATCH", "api/users/648/nla-credential", {
      statusCode: 404,
      fixture: "/patch/NLACredentialsChange.json",
    }).as("NLACredentialsChange");

    cy.contains("Save Credentials").click();
    cy.wait("@NLACredentialsChange");
    cy.get(".c-toast__message").should("not.exist");

    /*  cy.contains("NLA Credentials").click();
    cy.get('[name="NLAPassword"]').type("*");

    cy.intercept("PATCH", "api/users/648/nla-credential", (req) => {
      req.body = {
        errorMessage: "REST Authentication Failed",
        errorCode: 401,
        documentation: "",
      };
    }).as("NLACredentialsChange");

    cy.contains("Save Credentials").click();
    cy.wait("@NLACredentialsChange"); */
    // cy.get(".c-toast__message").should("contain", "NLA Credentials updated.");

    /* 
    cy.contains("NLA Credentials").click();
    cy.get('[name="NLAPassword"]').type("*");

    cy.intercept("PATCH", "api/users/648/nla-credential", {
      statusCode: 403,
    }).as("NLACredentialsChange");

    cy.contains("Save Credentials").click();
    cy.wait("@NLACredentialsChange");

    cy.contains("NLA Credentials").click();
    cy.get('[name="NLAPassword"]').type("*");
     */
    // cy.get(".c-toast__message").should("contain", "NLA Credentials updated.");
  });
});
