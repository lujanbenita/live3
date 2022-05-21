/* eslint-disable */
/// <reference types="cypress" />

describe("The Dashboard", () => {
  beforeEach(() => {
    cy.intercept("POST", /api\/dashboard\/topvolumetag/, {
      fixture: "/post/dashboard/topvolumetag.json",
      statusCode: 404,
    }).as("topVolumeTag");

    cy.intercept("POST", /api\/dashboard\/topstories/, {
      fixture: "/post/dashboard/topstories.json",
      statusCode: 404,
    }).as("topStories");

    cy.intercept("POST", /api\/dashboard\/summary/, {
      fixture: "/post/dashboard/summary.json",
      statusCode: 404,
    }).as("summary");

    cy.loadDashboard(null, null, ["topVolumeTag", "topStories", "summary"]);
  });

  afterEach(() => {
    cy.get(".c-error__page").should("not.exist");
  });

  it("can't load some widgets and shows warning message", () => {
    cy.get("Please wait while we are processing your request").should(
      "not.exist"
    );
    cy.get(
      'span:visible:contains("Not available for this filter configuration")'
    ).should("have.length", 7);
    cy.contains("Something went wrong. Please reload").should("have.length", 1);
  });
});
