/* eslint-disable */
/// <reference types="cypress" />

import localStorageNewUser from "../../../fixtures/user/localStorageNewUser.json";

describe("The Dashboard", () => {
  beforeEach(() => {
    cy.loadDashboard(localStorageNewUser, null, ["newUser"]); // new user
  });

  afterEach(() => {
    cy.get(".c-error__page").should("not.exist");
  });

  it("is loaded", () => {
    cy.contains("Dashboard");
    cy.get(".c-navbar-tab--active").contains("Media Intelligence");
  });

  it("shows skeleton for new user", () => {
    cy.get(".MuiSkeleton-root").should("have.length", 13);
  });

  it("shows tutorial for new user and not shows it again after reloading", () => {
    cy.contains("Welcome to alva Live.")
      .should("be.visible")
      .get(".introjs-nextbutton")
      .contains("Next")
      .should("exist")
      .should("be.visible")
      .click({ force: true })
      .wait(500);

    cy.contains("Use the options menu to perform analysis")
      .should("be.visible")
      .get(".introjs-nextbutton")
      .contains("Next")
      .should("exist")
      .should("be.visible")
      .click({ force: true })
      .wait(500);

    cy.contains("Access your user data and configuration")
      .should("be.visible")
      .get(".introjs-nextbutton")
      .contains("Done")
      .should("exist")
      .should("be.visible")
      .click({ force: true })
      .wait(500);

    cy.reload();

    cy.contains("Welcome to alva Live.").should("not.exist");
  });

  it("skips tutorial for new user", () => {
    cy.contains("Welcome to alva Live.")
      .should("be.visible")
      .get(".introjs-skipbutton")
      .should("be.visible")
      .click()
      .wait(500);

    cy.contains("Welcome to alva Live.").should("not.exist");

    cy.reload();

    cy.contains("Welcome to alva Live.").should("not.exist");
  });
});
