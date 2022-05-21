/* eslint-disable */
/// <reference types="cypress" />

describe('The "Reputation over time vs peers" widget', () => {
  beforeEach(() => {
    cy.loadDashboardRIReputation();
    cy.get("#widget-ri-reputation-over-time-vs-peers").as("widget");

    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );
    cy.wait(500);
    cy.get("body").then(($body) => {
      if ($body.find(".introjs-tooltipReferenceLayer").length > 0) {
        cy.get("a.introjs-skipbutton").click();
      }
    });
  });

  afterEach(() => {
    cy.get(".c-error__page").should("not.exist");
  });

  it("is loaded", () => {
    cy.get("@widget").contains("Reputation over time vs peers");
    cy.get("@widget").contains("SENTIMENT");
  });

  it("displays error and toast warning if endpoint fails", () => {
    cy.intercept(
      "POST",
      /api\/reputation-intelligence\/reputation\/reputation-over-time/,
      {
        statusCode: 500,
      }
    ).as("status500");

    cy.get(".c-tag").click({ force: true });
    cy.wait("@status500");
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
    // cy.contains("Something went wrong. Please reload alva Live and try again");
  });

  it("is loaded with empty or zero data", () => {
    cy.intercept(
      "POST",
      /api\/reputation-intelligence\/reputation\/reputation-over-time/,
      {
        fixture: "post/widgets/emptyData/emptyDataArray.json",
      }
    ).as("reputationOverTime");

    cy.get(".c-tag").click({ force: true });
    cy.wait("@reputationOverTime");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );

    cy.get("@widget")
      .should("be.visible")
      .contains("No data was obtained for this search");
  });

  it("is not available when search is updated, and available after clearing filters", () => {});

  it("downloads a image", () => {
    cy.get("@widget").find(".c-options-button").click();
    cy.get(
      ".c-option-button__option:contains('Download image'):visible"
    ).click();

    cy.wait(3000);
    cy.checkFile("Reputation-over*.png");
  });

  it("downloads a csv", () => {
    cy.get("@widget").find(".c-options-button").click();
    cy.get(
      ".c-option-button__option:contains('Download data'):visible"
    ).click();

    cy.wait(1000);
    cy.checkFile("Reputation-over*.csv");
  });

  // it("updates filter and redirects to feed after clicking in first bar", () => {});

  // it("updates filter and redirects to feed after clicking in series label", () => {});

  // it("updates focus with legend click", () => {});
});
