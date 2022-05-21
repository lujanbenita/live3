/* eslint-disable */
/// <reference types="cypress" />

describe('The "Quarterly reputation forecast" widget', () => {
  beforeEach(() => {
    cy.loadDashboardRIReputation();
    cy.get("#widget-ri-quarterly-reputation-forecast").as("widget");

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
    cy.get("@widget").contains("Quarterly reputation forecast");
    cy.get("@widget").contains("Reputation prediction");
  });

  it("displays error and toast warning if endpoint fails", () => {
    cy.intercept(
      "POST",
      /api\/reputation-intelligence\/reputation\/quarterly-reputation-forcast/,
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
      /api\/reputation-intelligence\/reputation\/quarterly-reputation-forcast/,
      {
        fixture: "post/widgets/emptyData/emptyDataArray.json",
      }
    ).as("emptyData");

    cy.get(".c-tag").click({ force: true });
    cy.wait("@emptyData");
    cy.contains("Please wait while we are processing your request").should(
      "not.exist"
    );

    cy.get("@widget")
      .should("be.visible")
      .contains("No data was obtained for this search");
  });

  it("downloads a image", () => {
    cy.get("@widget").find(".c-options-button").click();
    cy.get(
      ".c-option-button__option:contains('Download image'):visible"
    ).click();

    cy.wait(3000);
    cy.checkFile("Quarterly-reputation*.png");
  });

  it("downloads a csv", () => {
    cy.get("@widget").find(".c-options-button").click();
    cy.get(
      ".c-option-button__option:contains('Download data'):visible"
    ).click();

    cy.wait(1000);
    cy.checkFile("Quarterly-reputation*.csv");
  });

  // it("updates filter and redirects to feed after clicking in first bar", () => {});

  // it("updates filter and redirects to feed after clicking in series label", () => {});

  // it("updates focus with legend click", () => {});
});
