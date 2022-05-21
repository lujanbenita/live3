/* eslint-disable */
/// <reference types="cypress" />

describe("The 'Password Change' form", () => {
  beforeEach(() => {
    cy.setupStorageAndCookies();
    cy.visit(`${Cypress.env("host")}/my-account/my-settings`);
  });

  afterEach(() => {
    cy.get(".c-error__page").should("not.exist");
  });

  // "Current Password" field

  it("shows error if the current password field is not filled", () => {
    cy.get('[name="NEW_PASSWORD"]').type("new_password_A_1_*");
    cy.get('[name="REPEAT_NEW_PASSWORD"]').type("new_password_A_1_*");
    cy.contains("Change Password").click();

    cy.contains("current password is required");
  });

  // "New Password" field

  it("shows error if the new password is too short", () => {
    cy.get('[name="CURRENT_PASSWORD"]').type("current_password");
    cy.get('[name="NEW_PASSWORD"]').type("shortpw");
    cy.get('[name="REPEAT_NEW_PASSWORD"]').type("shortpw");
    cy.contains("Change Password").click();

    cy.contains("must be at least 8 characters");
  });

  it("shows error if the new password fields doesn't match", () => {
    cy.get('[name="CURRENT_PASSWORD"]').type("current_password");
    cy.get('[name="NEW_PASSWORD"]').type("new_password_a");
    cy.get('[name="REPEAT_NEW_PASSWORD"]').type("new_password_b");
    cy.contains("Change Password").click();

    cy.contains("passwords must match");
  });

  it("shows error if the new password doesn't contain one uppercase", () => {
    cy.get('[name="CURRENT_PASSWORD"]').type("current_password");
    cy.get('[name="NEW_PASSWORD"]').type("new_password_1_*");
    cy.get('[name="REPEAT_NEW_PASSWORD"]').type("new_password_1_*");
    cy.contains("Change Password").click();

    cy.contains("must contain one uppercase");
  });

  it("shows error if the new password doesn't contain one lowercase", () => {
    cy.get('[name="CURRENT_PASSWORD"]').type("current_password");
    cy.get('[name="NEW_PASSWORD"]').type("NEW_PASSWORD_1_*");
    cy.get('[name="REPEAT_NEW_PASSWORD"]').type("NEW_PASSWORD_1_*");
    cy.contains("Change Password").click();

    cy.contains("must contain one lowercase");
  });

  it("shows error if the new password doesn't contain one number", () => {
    cy.get('[name="CURRENT_PASSWORD"]').type("current_password");
    cy.get('[name="NEW_PASSWORD"]').type("NEW_PASSWORD_a_*");
    cy.get('[name="REPEAT_NEW_PASSWORD"]').type("NEW_PASSWORD_a_*");
    cy.contains("Change Password").click();

    cy.contains("must contain one number");
  });

  it("shows error if the new password doesn't contain one special character", () => {
    cy.get('[name="CURRENT_PASSWORD"]').type("current_password");
    cy.get('[name="NEW_PASSWORD"]').type("NEW_PASSWORD_a_1");
    cy.get('[name="REPEAT_NEW_PASSWORD"]').type("NEW_PASSWORD_a_1");
    cy.contains("Change Password").click();

    cy.contains("must contain one special case character");
  });

  // "Repeat New Password" field

  it("shows error if the 'Repeat New Password' field is not filled", () => {
    cy.get('[name="CURRENT_PASSWORD"]').type("current_password");
    cy.get('[name="NEW_PASSWORD"]').type("NEW_PASSWORD_a_1_*");
    cy.contains("Change Password").click();

    cy.contains("passwords must match");
  });

  it("changes password", () => {
    cy.get('[name="CURRENT_PASSWORD"]').type("current_password");
    cy.get('[name="NEW_PASSWORD"]').type("NEW_PASSWORD_a_1_*");
    cy.get('[name="REPEAT_NEW_PASSWORD"]').type("NEW_PASSWORD_a_1_*");

    cy.intercept("PATCH", "/api/users/*/change-password", {
      fixture: "/patch/changePassword.json",
    }).as("changePassword");

    cy.contains("Change Password").click();
    cy.wait("@changePassword");
    cy.contains("Password updated");
  });

  it("shows error if response is not valid and does not have error message", () => {
    cy.get('[name="CURRENT_PASSWORD"]').type("Testing1*");
    cy.get('[name="NEW_PASSWORD"]').type("Testing1**");
    cy.get('[name="REPEAT_NEW_PASSWORD"]').type("Testing1**");

    cy.intercept("PATCH", "api/users/648/change-password", {
      statusCode: 401,
    }).as("changePassword401");

    cy.contains("Change Password").click();
    cy.wait("@changePassword401");
    cy.contains("Error updating password");
  });

  it("shows error if response is not valid and has error message", () => {
    cy.get('[name="CURRENT_PASSWORD"]').type("Testing1*");
    cy.get('[name="NEW_PASSWORD"]').type("Testing1**");
    cy.get('[name="REPEAT_NEW_PASSWORD"]').type("Testing1**");

    cy.intercept("PATCH", "api/users/648/change-password", {
      statusCode: 403,
      fixture: "/patch/errorChangePassword.json",
    }).as("changePassword403");

    cy.contains("Change Password").click();
    cy.wait("@changePassword403");
    cy.contains("Change password error message");
  });
});
