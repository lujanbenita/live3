/* eslint-disable */
/// <reference types="cypress" />

describe("The Saved Searches page", () => {
  beforeEach(() => {
    cy.setupStorageAndCookies();

    cy.intercept("GET", /api\/search\/savedSearchList/, {
      fixture: "/get/search/savedSearchList.json",
    }).as("savedSearches");

    cy.visit(`${Cypress.env("host")}/media-intelligence/saved-searches`);
    cy.wait("@savedSearches");
  });

  afterEach(() => {
    cy.get(".c-error__page").should("not.exist");
  });

  it("loads saved searches list", () => {
    cy.contains("h1", "Saved Searches");
    cy.contains(".c-table", "pepo");
  });

  it("loads saved search and redirects to Media Intelligence", () => {
    cy.intercept("GET", "/api/search/savedSearch/**", {
      fixture: "/get/search/savedSearchNumber.json",
    }).as("searchSelected");

    cy.intercept("POST", "/api/search/tag", {
      fixture: "/post/search/tag.json",
    }).as("tag");

    cy.get(".c-saved-searches__table-icon").first().click();

    cy.wait("@searchSelected");
    cy.wait("@tag");

    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });

    cy.url().should("include", "/media-intelligence/search/dashboard");
  });

  it("deletes a saved search", () => {
    cy.get(".c-saved-searches__table-icon").eq(1).click();
    cy.contains("Do you want to delete the search pepo?").should("be.visible");
    cy.contains("Cancel").should("be.visible").click();
    cy.contains("Do you want to delete the search pepo?").should("not.exist");
    cy.get(".c-saved-searches__table-icon").eq(1).click();
    cy.contains("Do you want to delete the search pepo?").should("be.visible");

    cy.intercept("DELETE", /api\/search\/savedSearch\/3510/, {
      fixture: "/delete/search/search.json",
    }).as("deleteSearch");

    cy.intercept("GET", /api\/search\/savedSearchList/, {
      fixture: "/get/search/savedSearchListDeleteOne.json",
      statusCode: 200,
    });

    cy.contains("Confirm delete").should("be.visible").click();

    cy.wait("@deleteSearch").then(() => {
      cy.contains("Your search has been deleted successfully").should(
        "be.visible"
      );
      cy.contains("pepo").should("not.exist");
    });
  });

  it("has several pages", () => {
    cy.get(".c-saved-searches").contains("Alert Cypress test");
    cy.get(".c-pagination").contains("1-25 of");
    cy.get('button[aria-label="Next page"]').click();
    cy.get(".c-pagination").contains("26-50 of");
    cy.get(".c-saved-searches")
      .contains("Alert Cypress test")
      .should("not.exist");
    cy.get(".c-saved-searches").contains("test 2 without date range");
    cy.get('button[aria-label="Previous page"]').click();
    cy.get(".c-saved-searches").contains("Alert Cypress test");
    cy.get(".c-saved-searches")
      .contains("test 2 without date range")
      .should("not.exist");
  });

  it("changes the number of elements on each page", () => {
    cy.get(".c-pagination .MuiTablePagination-selectRoot").click();
    cy.get('[data-value="60"]').click();
    cy.get(".c-pagination").contains(/^1-60 of 106$/);

    cy.log("Testing pagination index");
    cy.get('button[aria-label="Next page"]').click();
    cy.get(".c-pagination .MuiTablePagination-selectRoot").click();
    cy.get('[data-value="240"]').click();
    cy.get(".c-pagination").contains(/^1-106 of 106$/);
  });
});
