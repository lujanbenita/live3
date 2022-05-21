/* eslint-disable */
/// <reference types="cypress" />

import "cypress-real-events/support";

import localStorageWithoutNLACredentials from "../../../../fixtures/user/localStorageWithoutNLACredentials.json";

describe('The "Client Top Stories" widget', () => {
  beforeEach(() => {
    cy.loadDashboard(localStorageWithoutNLACredentials); // new user
    cy.get(
      ".c-layout__children-container > div:nth-child(2) > div:nth-child(4) > div:nth-child(3)"
    ).as("widget");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );
  });

  it("shows article in modal if story is clicked", () => {
    cy.intercept("GET", "/api/feed/articles/*", {
      fixture: "/get/article/article.json",
      statusCode: 200,
    }).as("selectArticle");

    cy.get("@widget").contains("Metroid Dread review").click();
    cy.wait("@selectArticle");
    cy.contains("Nintendo Switch Black Friday deals 2021: Best offers on");
    cy.contains("It’s the day all eager shoppers have been waiting for");

    cy.get(".c-article-detail-header__actions button").eq(1).click();
    cy.get("span[data-for='nla-tooltip']").eq(1).realHover();
  });
});
