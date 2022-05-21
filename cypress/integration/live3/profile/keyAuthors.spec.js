/* eslint-disable */
/// <reference types="cypress" />

describe("The Key Authors page", () => {
  beforeEach(() => {
    cy.setupStorageAndCookies();

    cy.intercept("GET", "api/filters*", {
      fixture: "/get/keyAuthors.json",
    }).as("keyAuthors");

    cy.visit(`${Cypress.env("host")}/my-account/key-authors-lists`);

    cy.wait("@keyAuthors");
  });

  afterEach(() => {
    cy.get(".c-error__page").should("not.exist");
  });

  it("loads the key authors list", () => {
    cy.get(".c-tab--active").contains("Key Authors List");
    cy.get("button").contains("New Key authors List");
  });

  it("creates new Key Authors list", () => {
    cy.get(".c-saved-searches__button-new-search").click();
    cy.get(".c-key-lists-modal__title-input").click();

    cy.get(".c-key-lists-modal__title-input input").type(`cypress testing 3`);

    cy.intercept("POST", "/api/search/author", {
      fixture: "post/author/author.json",
    }).as("author");

    cy.get(".c-custom-multiple-tags-input__input").click();
    cy.get(".c-custom-multiple-tags-input__input").type("Manole");
    cy.wait("@author");

    cy.get(".c-custom-select-option").first().click();
    cy.get(".c-custom-multiple-tags-input__button").click();
    cy.contains("1 authors included").should("be.visible");

    cy.intercept("POST", "/api/filters*", {
      fixture: "post/author/createListAuthor.json",
      statusCode: 201, // ¡!
    }).as("createList");

    cy.intercept("GET", "/api/filters*", {
      fixture: "/get/keyAuthorsCreated.json",
    }).as("keyAuthorsCreatedList");

    cy.get(".c-button.c-button--save").click({ force: true });

    cy.wait("@createList").then(() => {
      cy.contains("The list has been successfully created");
      cy.contains("Add new Author Keylist").should("not.exist");
      cy.wait("@keyAuthorsCreatedList").then(() => {
        cy.contains("New created key authors list");
      });
    });
  });

  it("deletes Key Authors list", () => {
    cy.get("button.c-key-authors-lists__table-icon").eq(3).click();
    cy.contains("cypress testing to delete").should("exist");
    cy.contains("Are you sure you want to delete the").should("be.visible");

    cy.intercept("DELETE", "/api/filters/*", {
      fixture: "/delete/authorList/authorList.json",
    }).as("deleteKeyAuthorsList");

    cy.intercept("GET", "/api/filters*", {
      fixture: "/get/keyAuthorsDelete.json",
    }).as("keyAuthorsDeletedList");

    cy.get(".c-modal-advertence__accept-button")
      .should("contain", "Delete")
      .click();
    cy.wait("@deleteKeyAuthorsList").then(() => {
      cy.contains("The list has been successfully deleted");
      cy.wait("@keyAuthorsDeletedList").then(() => {
        cy.contains("cypress testing to delete").should("not.exist");
      });
    });
  });
});
