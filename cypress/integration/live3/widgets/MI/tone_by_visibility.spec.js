/* eslint-disable */
/// <reference types="cypress" />

describe('The "Tone by Visibility" widget', () => {
  beforeEach(() => {
    cy.loadDashboard();
    cy.get("#widget-mi-tone-by-visibility").as("widget");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );
  });

  afterEach(() => {
    cy.get(".c-error__page").should("not.exist");
  });

  it("is loaded", () => {
    cy.get("@widget").contains("Tone by Visibility");
    cy.get("@widget").contains("38");
    cy.get("@widget").contains("131");
    cy.get("@widget").contains("-4");
  });

  it("widget with focus tag", () => {
    cy.get(".c-tag").click({ force: true });
    cy.wait(2000);
    cy.get("@widget").find("h5").contains("Nintendo");
  });

  it("displays error and toast warning if endpoint fails", () => {
    cy.intercept("POST", "/api/dashboard/summary", {
      statusCode: 500,
    }).as("summaryPost");

    cy.get(".c-tag").click({ force: true });
    cy.wait("@summaryPost");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );

    cy.get("@widget")
      .should("be.visible")
      .contains(
        "No data could be retrieved for this widget. Please try again or check the search parameters."
      )
      .should("be.visible");

    //TODO: Toast should show
    //  cy.contains("Something went wrong. Please reload alva Live and try again");
  });

  it("is loaded with empty or zero data", () => {
    cy.get("body").then(($body) => {
      if ($body.find(".introjs-tooltipReferenceLayer").length > 0) {
        cy.get("a.introjs-skipbutton").click();
      }
    });
    cy.contains("Show filters").click();
    cy.contains("Source Type").should("be.visible");
    cy.get('[placeholder="Select Source Type"]').click();
    cy.wait(1000);

    cy.intercept("POST", "/api/dashboard/summary", {
      fixture: "post/widgets/summaryZeroData.json",
    }).as("summaryPost");

    cy.contains("Facebook").click();
    cy.wait("@summaryPost");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );

    cy.contains("Show filters").click();
    cy.contains("Source Type").should("not.be.visible");
    cy.get("@widget").should("be.visible").contains("Tone by Visibility");
    cy.get("@widget").should("be.visible").contains("0");
  });

  it("refreshes after adding and removing filter", () => {
    cy.get("body").then(($body) => {
      if ($body.find(".introjs-tooltipReferenceLayer").length > 0) {
        cy.get("a.introjs-skipbutton").click();
      }
    });
    cy.contains("Show filters").click();
    cy.get('[placeholder="Select Source Type"]').click();
    cy.contains("Facebook").click();

    cy.intercept("POST", "/api/dashboard/summary", {
      fixture: "post/widgets/summaryTonePositive.json",
    }).as("summaryPost");

    cy.get(".c-multiple-select__list-item-label").last().click();
    cy.wait("@summaryPost");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );
    cy.contains("Show filters").click();

    cy.get("@widget").contains("Tone by Visibility");
    cy.get("@widget").contains("104");
    cy.get("@widget").contains("12");

    cy.intercept("POST", /api\/dashboard\/summary/, {
      fixture: "/post/dashboard/summary.json",
    }).as("summary");

    cy.get(".c-filter-bar__clear-button").click({ force: true });
    cy.wait("@summary");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );

    cy.get("@widget").contains("Tone by Visibility");
    cy.get("@widget").contains("131");
    cy.get("@widget").contains("38");
  });

  it("is not available when search is updated, and available after clearing filters", () => {
    cy.get("body").then(($body) => {
      if ($body.find(".introjs-tooltipReferenceLayer").length > 0) {
        cy.get("a.introjs-skipbutton").click();
      }
    });
    cy.contains("Show filters").click();
    cy.get('[placeholder="Select Tone"]').click();
    cy.contains("Negative").click();

    cy.intercept("POST", "/api/dashboard/summary", {
      statusCode: 500,
      fixture: "post/widgets/summaryTonePositive.json",
    }).as("summaryPost");

    cy.get(".c-multiple-select__list-item-label").last().click();
    cy.wait("@summaryPost");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );
    cy.get("@widget").contains(
      "No data could be retrieved for this widget. Please try again or check the search parameters."
    );
    cy.intercept("POST", "/api/dashboard/summary", {
      fixture: "post/widgets/summaryTonePositive.json",
    }).as("summaryPost");
    cy.get(".c-filter-bar__clear-button").click({ force: true });
    cy.wait("@summaryPost");
    cy.get("@widget").contains("Tone by Visibility");
    cy.get("@widget").contains("104");
    cy.get("@widget").contains("12");
  });
});
