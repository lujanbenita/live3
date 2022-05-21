/* eslint-disable */
/// <reference types="cypress" />
import "cypress-real-events/support";

import localStorageWithoutAlva2 from "../../../fixtures/user/localStorageWithoutAlva2.json";

// Testing Clicks widgets MI and his exports svg
describe("The Dashboard", () => {
  beforeEach(() => {
    cy.viewport("ipad-mini"); // 768-1024
    cy.loadDashboard();
  });

  afterEach(() => {
    cy.get(".c-error__page").should("not.exist");
  });

  it("displays and hides responsive menu", () => {
    cy.get(".c-navbar-selector__listbox").should("not.exist");
    cy.get(".c-navbar-selector__value-container").should("be.visible").click();
    cy.get(".c-navbar-selector__listbox").should("be.visible");
    cy.get(".c-navbar__avatar-container").should("be.visible").click();
    cy.contains("My account").should("be.visible");
    cy.get(".c-navbar-selector__listbox").should("not.exist");
  });

  it('displays "Switch to alva 2" option', () => {
    cy.get(".c-avatar__avatar").click();
    cy.get(".MuiPaper-elevation8.MuiPaper-rounded")
      .should("be.visible")
      .contains("Switch to alva 2");
  });

  it('doesn\'t display "Switch to alva 2" option', () => {
    cy.loadDashboard(localStorageWithoutAlva2, null, ["alva2"]);
    cy.get(".c-avatar__avatar").click();
    cy.contains("Switch to alva 2").should("not.exist");
  });

  it("shows responsive menu and has all options disabled", () => {
    cy.get(".c-navbar-selector__listbox").should("not.exist");
    cy.get(".c-navbar-selector__value-container").should("be.visible").click();

    cy.get(".c-navbar-selector__listbox li")
      .eq(0)
      .contains("Media Intelligence");
    cy.get(".c-navbar-selector__listbox li")
      .eq(1)
      .contains("Reputation Intelligence");
    cy.get(".c-navbar-selector__listbox li").eq(2).contains("ESG Intelligence");
    cy.get(".c-navbar-selector__listbox li")
      .eq(3)
      .contains("Risk Intelligence");
    cy.get(".c-navbar-selector__listbox li")
      .eq(4)
      .contains("Board Intelligence");
  });

  it("has all menu options disabled", () => {
    const testMenu = (index) => {
      cy.get(".c-navbar-selector__value-container")
        .should("be.visible")
        .realClick();
      cy.get(".c-navbar-selector__listbox li").eq(index).realClick();
      cy.url().should("include", "/media-intelligence/search/dashboard");
    };

    for (let i = 0; i < 5; i += 1) {
      testMenu(i);
    }
  });

  it("displays responsive sidebar", () => {
    cy.get(".c-sidebar-responsive button").each((element) => {
      cy.wrap(element).should("be.visible");
    });
  });
});
