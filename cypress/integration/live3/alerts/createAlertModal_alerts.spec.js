/* eslint-disable */
/// <reference types="cypress" />

describe("The Create Alert modal in the Alerts page", () => {
  beforeEach(() => {
    cy.setupStorageAndCookies();

    cy.intercept("GET", /api\/search\/savedSearchList/, {
      fixture: "/get/search/savedSearchList.json",
    }).as("savedSearches");
    cy.intercept("GET", /api\/alerts/, {
      fixture: "/get/alerts.json",
    }).as("alerts");
    cy.intercept("POST", /api\/alerts/, {
      fixture: "/post/alerts/alerts.json",
    }).as("createAlert");
    cy.intercept("POST", /api\/search\/savedSearch/, {
      fixture: "/post/alerts/saveSearch.json",
    }).as("savedSearch");

    cy.visit(`${Cypress.env("host")}/media-intelligence/alerts`);
    cy.wait("@alerts");
    cy.wait("@savedSearches");
    cy.get(".c-table__footer-action--create").should("be.visible").click();
    cy.wait(500);
  });

  afterEach(() => {
    cy.get(".c-error__page").should("not.exist");
  });

  it("is opened", () => {
    cy.get(".c-save-search-modal__title")
      .should("be.visible")
      .contains("Create New Alert");
  });

  it("tries to save old alert without data", () => {
    cy.get(".c-button--save").should("be.visible").click();
    cy.contains("form", "Set an Alert Name");
    cy.contains("form", "Define an email subject");
    cy.contains("form", "Set at least one mail to receive the alert");
  });

  it("tries to save new alert without data", () => {
    cy.get('[name="toggleNewSearch"]').should("be.visible").click();
    cy.get(".c-button--save").should("be.visible").click();
    cy.contains("form", "The saved search needs a name");
    cy.contains("form", "Set an Alert Name");
    cy.contains("form", "Define an email subject");
    cy.contains("form", "Set at least one mail to receive the alert");
  });

  it("saves new alert based on a old search", () => {
    cy.get('[name="alertName"]').should("be.visible").type("alert name");
    cy.get(".c-input-box-tags__input")
      .should("be.visible")
      .type("cypress@cypress.cy{enter}");
    cy.get('[name="emailSubject"]')
      .should("be.visible")
      .type("My subject email cypress testing");
    cy.get("button.c-button--save").should("be.visible").click();
    cy.wait("@createAlert").then(() => {
      cy.contains("The Alert has been created");
    });
  });

  it("saves new alert based on a new search", () => {
    cy.get('[name="toggleNewSearch"]').should("be.visible").click();
    cy.get('[name="name"]').should("be.visible").type("Test search new Alert");
    cy.get('[name="alertName"]').should("be.visible").type("alert name");
    cy.get('[name="emailSubject"]')
      .should("be.visible")
      .type("My subject email cypress testing");
    cy.get(".c-input-box-tags__input")
      .should("be.visible")
      .type("cypress@cypress.cy{enter}");

    cy.intercept("GET", /api\/search\/savedSearchList/, {
      fixture: "/get/search/savedSearchListNewSearch.json",
    }).as("savedSearches");

    cy.get("button.c-button--save").should("be.visible").click();

    cy.intercept("GET", /api\/alerts/, {
      fixture: "/get/alertsAdded.json",
    }).as("alerts");

    cy.wait("@savedSearches").then(() => {
      cy.wait("@createAlert").then(() => {
        cy.contains("The Alert has been created");
        cy.contains("New alert");
      });
    });
  });

  it("shows error if tries to create alert while server is down", () => {
    cy.get(".c-alerts-modal__full-width").first().click();
    cy.wait(500);
    cy.get('[data-value="cypress"]').click();

    cy.get('[name="alertName"]').type("My cypress testing");

    cy.get(".c-alerts-modal__full-width:contains('Pulse Alert')").click();
    cy.get("li[data-value='Daily Alert']").click();
    cy.get("#alerts-form").contains("Delivery Time").click();
    cy.get("button:contains('OK')").click();
    cy.get('[name="emailSubject"]').type("My subject email cypress testing");
    cy.get(".c-input-box-tags__input").type("cypress@cypress.com{enter}");

    cy.intercept("POST", /api\/alerts/, {
      fixture: "/post/alerts/createAlertError.txt",
      statusCode: 400,
    }).as("errorCreateAlert");

    cy.get("button").contains("Save Alert").click();

    cy.wait("@errorCreateAlert").then(() => {
      cy.contains("There was a problem saving the alert.");
    });
  });
});
