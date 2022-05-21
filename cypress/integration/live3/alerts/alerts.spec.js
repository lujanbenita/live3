/* eslint-disable */
/// <reference types="cypress" />

describe("The Alerts page", () => {
  beforeEach(() => {
    cy.setupStorageAndCookies();

    cy.intercept("GET", /api\/search\/savedSearchList/, {
      fixture: "/get/search/savedSearchList.json",
    }).as("savedSearches");
    cy.intercept("GET", /api\/alerts/, {
      fixture: "/get/alerts.json",
    }).as("alerts");

    cy.visit(`${Cypress.env("host")}/media-intelligence/alerts`);
    cy.wait("@alerts");
    cy.wait("@savedSearches");
  });

  afterEach(() => {
    cy.get(".c-error__page").should("not.exist");
  });

  it("loads alerts page with two alerts", () => {
    cy.contains("h1", "Alerts");
    cy.contains(".c-table", "Neptune test alert");
    cy.contains(".c-table", "Samsun + nintendo test");
  });

  it("delete an alert", () => {
    cy.intercept("DELETE", "api/alerts/**", {
      statusCode: 200,
      body: {},
    }).as("deleteAlert");

    cy.intercept("GET", /api\/alerts/, {
      fixture: "/get/alertsRemove.json",
    }).as("alertsRemove");

    cy.get(".c-alerts__table-icon").first().should("be.visible").click();

    cy.contains("Do you want to delete the alert");
    cy.get(".c-modal-advertence__accept-button").should("be.visible").click();

    cy.wait("@alertsRemove").then(() => {
      cy.contains("Samsun + nintendo test").should("not.exist");
      cy.contains("The Alert has been deleted successfully.");
    });
  });
});
