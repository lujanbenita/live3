/* eslint-disable */
/// <reference types="cypress" />

describe("The Key Publications page", () => {
  beforeEach(() => {
    cy.setupStorageAndCookies();

    cy.intercept("GET", "/api/filters*", {
      fixture: "/get/keyPublications.json",
    }).as("keyPublications");

    cy.visit(`${Cypress.env("host")}/my-account/key-publications-lists`);

    cy.wait("@keyPublications");
  });

  afterEach(() => {
    cy.get(".c-error__page").should("not.exist");
  });

  it("loads the key publications list", () => {
    cy.get(".c-tab--active").contains("Key Publication List");
    cy.get("button").contains("New Key Publications List");
  });

  it("creates new Key Publications list", () => {
    cy.get(".c-saved-searches__button-new-search").click();
    cy.get(".c-key-lists-modal__title-input").click();

    cy.get(".c-key-lists-modal__title-input input").type(`cypress testing 3`);

    cy.intercept("POST", "/api/filters*", {
      fixture: "post/author/createListAuthor.json",
      statusCode: 201, // ¡!
    }).as("createList");

    cy.intercept("POST", "/api/search/publication", {
      fixture: "post/publication/publication.json",
    }).as("publication");

    cy.get(".c-custom-multiple-tags-input__input").click();
    cy.get(".c-custom-multiple-tags-input__input").type("Manole");
    cy.wait("@publication");

    cy.get(".c-custom-select-option").first().click();
    cy.get(".c-custom-multiple-tags-input__button").click();
    cy.contains("1 publications included").should("be.visible");
    cy.get(".c-button.c-button--save").click({ force: true });
    cy.wait("@createList").then(() => {
      cy.contains("The list has been successfully created");
      cy.contains("Add new Author Keylist").should("not.exist");
    });
  });

  it("deletes Key Publications list", () => {
    cy.get("button.c-key-authors-lists__table-icon").eq(3).click();
    cy.contains("cypress testing to delete").should("exist");
    cy.contains("Are you sure you want to delete the").should("be.visible");

    cy.intercept("DELETE", "/api/filters/*", {
      fixture: "/delete/publicationList/publicationList.json",
    }).as("deleteKeyPublicationList");

    cy.intercept("GET", "/api/filters*", {
      fixture: "/get/keyPublicationsDelete.json",
    }).as("keyPublicationsDeletedList");

    cy.get(".c-modal-advertence__accept-button")
      .should("contain", "Delete")
      .click();
    cy.wait("@deleteKeyPublicationList").then(() => {
      cy.contains("The list has been successfully deleted");
      cy.wait("@keyPublicationsDeletedList").then(() => {
        cy.contains("cypress testing to delete").should("not.exist");
      });
    });
  });
});
