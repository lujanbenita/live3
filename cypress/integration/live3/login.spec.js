/* eslint-disable */
/// <reference types="cypress" />

describe("The login", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("host")}/login`);
  });

  it("greets with Welcome message", () => {
    cy.contains("h1", "Welcome to alva.live");
  });

  it("shows error if the email is empty", () => {
    cy.get("#standard-password-input").type("aaaaaa");
    cy.get(".c-submit-button").click();
    cy.get(".c-input.c-login__field").first().contains("Required");
    cy.get(".c-input.c-login__field")
      .last()
      .contains("Required")
      .should("not.exist");
  });

  it("shows error if the password is empty", () => {
    cy.get("#standard-basic").type("test@test.com");
    cy.get(".c-submit-button").click();
    cy.get(".c-input.c-login__field")
      .first()
      .contains("Required")
      .should("not.exist");
    cy.get(".c-input.c-login__field").last().contains("Required");
  });

  it("shows errors if the fields are empty", () => {
    cy.get(".c-submit-button").click();
    cy.get(".c-input.c-login__field").first().contains("Required");
    cy.get(".c-input.c-login__field").last().contains("Required");
  });

  it("shows error if the user sends any credentials and server is down", () => {
    cy.intercept("POST", /api\/login/, { statusCode: 500 }).as("serverDown");
    cy.get("#standard-basic").type("test@test.com");
    cy.get("#standard-password-input").type("aaaaaa");
    cy.get(".c-submit-button").click();

    cy.wait("@serverDown").then(() => {
      cy.get(".Toastify__toast-body").contains("Something went wrong.");
    });
  });

  it("shows error if the user sends wrong credentials", () => {
    cy.intercept("POST", /api\/login/, {
      fixture: "/login/errorLogin.json",
      statusCode: 401,
    }).as("wrongLogin");

    cy.get("#standard-basic").type("test@test.com");
    cy.get("#standard-password-input").type("aaaaaa");
    cy.get(".c-submit-button").click();

    cy.wait("@wrongLogin").then(() => {
      cy.get(".Toastify__toast-body").contains(
        "The username or password entered was incorrect. Please check and try again."
      );
    });
  });

  it("navigates to /media-intelligence/search/dashboard on successful login", () => {
    cy.intercept("POST", /api\/login/, {
      fixture: "/login/correctLogin.json",
      statusCode: 200,
    }).as("correctLogin");

    cy.intercept("GET", /services\/logout/, {
      statusCode: 200,
    }).as("live2Logout");

    cy.intercept("POST", /content/, {
      statusCode: 200,
    }).as("live2Login");

    cy.get("#standard-basic").type("test@test.com");
    cy.get("#standard-password-input").type("aaaaaa");
    cy.get(".c-submit-button").click();

    cy.wait("@correctLogin").then(() => {
      Cypress.on("uncaught:exception", () => {
        return false;
      });
      cy.intercept("api/**", {
        statusCode: 200,
      }).as("ignoredRequest");

      cy.url().should("include", "/media-intelligence/search/dashboard");
    });
  });

  it("navigates to dashboard on successful login with new user", () => {
    cy.intercept("POST", /api\/login/, {
      fixture: "/login/newUserLogin.json",
      statusCode: 200,
    }).as("correctLogin");

    cy.intercept("GET", /services\/logout/, {
      statusCode: 200,
    }).as("live2Logout");

    cy.intercept("POST", /content/, {
      statusCode: 200,
    }).as("live2Login");

    cy.get("#standard-basic").type("test@test.com");
    cy.get("#standard-password-input").type("aaaaaa");

    cy.get(".c-submit-button").click();

    cy.wait("@correctLogin");
    cy.intercept("PATCH", "/api/users/*", {
      fixture: "/patch/users.json",
    }).as("patchUser");

    cy.url().should("include", "/media-intelligence/search/dashboard");
    cy.get(".c-tutorial__tooltip--dashboard-1")
      .contains(
        "Use the searchbox to select terms, companies, products, etc. to perform your first search."
      )
      .should("be.visible");
  });

  it("Show error for login with token empty", () => {
    cy.intercept("POST", /api\/login/, {
      fixture: "/login/withoutTokenLogin.json",
      statusCode: 200,
    }).as("correctLogin");

    cy.get("#standard-basic").type("test@test.com");
    cy.get("#standard-password-input").type("aaaaaa");
    cy.get(".c-submit-button").click();
    cy.wait("@correctLogin");

    cy.get(".c-toast__message")
      .contains("Something went wrong. Please reload the page and try again.")
      .should("be.visible");

    // cy.url().should("include", "/media-intelligence/search/dashboard");
  });
});
